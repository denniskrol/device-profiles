# Device Profiles

Daily updated browser/device profiles with weighted random selection. Useful for realistic client fingerprint spoofing, testing, load generation.

Data comes from a website with about 65% mobile and 35% desktop traffic. Uses [browser-profiler](https://github.com/denniskrol/browser-profiler) to get data

## Install

```bash
npm install @denniskrol/device-profiles
```

## Basic Usage

```ts
import DeviceProfiles from '@denniskrol/device-profiles';

// Get a weighted random profile
const profile = new DeviceProfiles();
console.log(profile.userAgent, profile.deviceType);
```

## Filtered Random

```ts
// Only mobile devices
const mobile = new DeviceProfiles({ deviceType: 'mobile' });

// Regex match browser name
const safari = new DeviceProfiles({ browser: /Safari/ });

// Inclusion list (e.g. mobile OR tablet)
const touch = new DeviceProfiles({ deviceType: ['mobile', 'tablet'] });
```

## Static Helpers

```ts
import { DeviceProfiles } from '@denniskrol/device-profiles';

// Get array of all profiles
const all = DeviceProfiles.all();

// Get random with filter without instantiating
const randomDesktop = DeviceProfiles.random({ deviceType: 'desktop' });
```

## Profile example

```json
{
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
  "platform": "Win32",
  "deviceMemory": 8,
  "hardwareConcurrency": 8,
  "vendor": "Google Inc.",
  "screenHeight": 720,
  "screenWidth": 1280,
  "viewportHeight": 568,
  "viewportWidth": 1251,
  "devicePixelRatio": 1.5,
  "webglRenderer": "ANGLE (Intel, Intel(R) UHD Graphics (0x00009B41) Direct3D11 vs_5_0 ps_5_0, D3D11)",
  "webglVendor": "Google Inc. (Intel)",
  "webGpuArchitecture": "gen-9",
  "webGpuVendor": "intel",
  "storageQuota": {
    "quota": 113282066841,
    "usage": 0,
    "available": 113282066841
  },
  "jsHeapSizeLimit": 2248146944,
  "fonts": [
    "Aldhabi",
    "Bahnschrift",
    "Cambria Math",
    "Gadugi",
    "HoloLens MDL2 Assets",
    "Ink Free",
    "Javanese Text",
    "Leelawadee UI",
    "Lucida Console",
    "MS Outlook",
    "Myanmar Text",
    "Nirmala UI",
    "Segoe MDL2 Assets",
    "Segoe UI Emoji"
  ],
  "userAgentData": {
    "architecture": "x86",
    "bitness": "64",
    "brands": [
      {
        "brand": "Chromium",
        "version": "142"
      },
      {
        "brand": "Google Chrome",
        "version": "142"
      },
      {
        "brand": "Not_A Brand",
        "version": "99"
      }
    ],
    "fullVersionList": [
      {
        "brand": "Chromium",
        "version": "142.0.7444.134"
      },
      {
        "brand": "Google Chrome",
        "version": "142.0.7444.134"
      },
      {
        "brand": "Not_A Brand",
        "version": "99.0.0.0"
      }
    ],
    "mobile": false,
    "model": null,
    "platform": "Windows",
    "platformVersion": "10.0.0",
    "uaFullVersion": "142.0.7444.134"
  }
}
```

## Filtering Rules
- Primitive equality (deviceType: `'mobile'`)
- Inclusion list (deviceType: `['mobile','tablet']`)
- RegExp match (browser: `/Safari/`)

## Weighted Selection
Each profile has a weight. Random selection is proportional to weight.

## JSON Access
You can also import the raw JSON:

```ts
import profilesJson from '@denniskrol/device-profiles/deviceprofiles.json';
console.log(profilesJson.length);
```

## License
Unlicense
