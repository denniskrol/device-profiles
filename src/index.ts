/* Device Profiles library */
import profilesData from './deviceprofiles.json';

// Type definitions
export interface StorageQuotaInfo {
  quota: number; usage: number; available: number;
}
export interface DeviceProfile {
  userAgent: string;
  platform?: string | null;
  deviceMemory?: number | null;
  hardwareConcurrency?: number | null;
  vendor?: string | null;
  screenHeight?: number | null;
  screenWidth?: number | null;
  viewportHeight?: number | null;
  viewportWidth?: number | null;
  devicePixelRatio?: number | null;
  webglRenderer?: string | null;
  webglVendor?: string | null;
  webGpuArchitecture?: string | null;
  webGpuVendor?: string | null;
  storageQuota?: StorageQuotaInfo | null;
  jsHeapSizeLimit?: number | null;
  fonts?: string[];
  userAgentData?: any;
  weight?: number; // weighting for random selection
  deviceType?: string; // mobile, desktop, tablet, etc.
  browser?: string;
  osName?: string;
  [key: string]: any; // allow extra dynamic keys
}

export type DeviceProfileFilter = Partial<Record<keyof DeviceProfile, any>> & {
  // Allow passing an inclusion list: { deviceType: ['mobile','tablet'] }
};
export type DeviceProfilePredicate = (profile: DeviceProfile) => boolean;

const profiles: DeviceProfile[] = profilesData as DeviceProfile[];

function matchesFilter(profile: DeviceProfile, filter: DeviceProfileFilter): boolean {
  for (const [key, expected] of Object.entries(filter)) {
    const actual = (profile as any)[key];
    if (Array.isArray(expected)) {
      // inclusion list
      if (!expected.includes(actual)) return false;
    } else if (expected instanceof RegExp) {
      if (typeof actual !== 'string' || !expected.test(actual)) return false;
    } else if (expected !== undefined) {
      if (actual !== expected) return false;
    }
  }
  return true;
}

// Helper to unify object or predicate filtering
function filterProfiles(input?: DeviceProfileFilter | DeviceProfilePredicate): DeviceProfile[] {
  if (!input || (typeof input === 'object' && Object.keys(input).length === 0)) return profiles;
  if (typeof input === 'function') return profiles.filter(p => input(p));
  return profiles.filter(p => matchesFilter(p, input));
}

function pickWeightedRandom(items: DeviceProfile[]): DeviceProfile {
  if (!items.length) {
    throw new Error('No device profiles available for the given filter.');
  }
  const totalWeight = items.reduce((sum, p) => sum + (p.weight ?? 1), 0);
  let threshold = Math.random() * totalWeight;
  for (const p of items) {
    threshold -= (p.weight ?? 1);
    if (threshold <= 0) return p;
  }
  // Fallback (floating point) return last
  return items[items.length - 1];
}

export class DeviceProfiles {
  // Dynamically attach chosen profile properties to this instance
  [key: string]: any;
  userAgent: string; // required property exposed for convenience
  private _profile: DeviceProfile;

  constructor(filter: DeviceProfileFilter | DeviceProfilePredicate = {}) {
    const filtered = filterProfiles(filter);
    this._profile = pickWeightedRandom(filtered);
    this.userAgent = this._profile.userAgent; // explicit assignment
    Object.assign(this, this._profile);
  }

  static all(): DeviceProfile[] {
    return [...profiles];
  }

  // Overloads for better TS inference (optional, runtime uses single impl)
  static random(): DeviceProfile;
  static random(filter: DeviceProfileFilter): DeviceProfile;
  static random(predicate: DeviceProfilePredicate): DeviceProfile;
  static random(filter: DeviceProfileFilter | DeviceProfilePredicate = {}): DeviceProfile {
    const filtered = filterProfiles(filter);
    return pickWeightedRandom(filtered);
  }

  get profile(): DeviceProfile { return this._profile; }
}

export default DeviceProfiles;
