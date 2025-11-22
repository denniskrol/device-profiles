import { describe, it, expect } from 'vitest';
import { DeviceProfiles } from '../src';

describe('DeviceProfiles', () => {
  it('returns a profile instance with properties', () => {
    const dp = new DeviceProfiles();
    expect(dp.userAgent).toBeTypeOf('string');
    expect(Object.keys(dp).length).toBeGreaterThan(0);
  });

  it('can filter by deviceType', () => {
    const dp = new DeviceProfiles({ deviceType: 'mobile' });
    expect(dp.deviceType).toBe('mobile');
  });

  it('static random respects filter', () => {
    const profile = DeviceProfiles.random({ deviceType: 'mobile' });
    expect(profile.deviceType).toBe('mobile');
  });

  it('all returns non-empty array', () => {
    const all = DeviceProfiles.all();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it('throws when filter excludes all profiles', () => {
    expect(() => new DeviceProfiles({ deviceType: '__does_not_exist__' })).toThrow();
  });
});

