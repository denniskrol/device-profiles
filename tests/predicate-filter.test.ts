import { describe, it, expect } from 'vitest';
import DeviceProfiles from '../src';

describe('DeviceProfiles predicate filtering', () => {
  const chromePredicate = (p: any) =>
    typeof p.userAgent === 'string' &&
    p.userAgent.toLowerCase().includes('chrome') &&
    !!p.userAgentData;

  it('DeviceProfiles.random accepts a predicate and returns matching profile', () => {
    const profile = DeviceProfiles.random(chromePredicate);
    expect(chromePredicate(profile)).toBe(true);
  });

  it('DeviceProfiles constructor accepts a predicate and assigns matching profile', () => {
    const dp = new DeviceProfiles(chromePredicate);
    expect(chromePredicate(dp.profile)).toBe(true);
    expect(dp.userAgent).toBe(dp.profile.userAgent);
  });

  it('Predicate that matches nothing throws', () => {
    const impossible = () => false;
    expect(() => DeviceProfiles.random(impossible)).toThrow(/No device profiles/);
    expect(() => new DeviceProfiles(impossible)).toThrow(/No device profiles/);
  });
});
