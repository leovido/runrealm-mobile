# Biome Linting Errors - Fix Guide

## Current Status
After fixing the safe issues, you still have **59 errors** (mostly warnings treated as errors). Here's a systematic approach to fix them.

## Error Categories

### 1. **Unused Imports** (FIXABLE - Auto-fixable)
**Issue**: `React` import in `MobileApp.tsx` is flagged as unused.

**Fix Options**:
- **Option A**: Remove `React` import (if using React 17+ JSX transform)
  ```tsx
  // Change from:
  import React, { useEffect, useState } from 'react';
  // To:
  import { useEffect, useState } from 'react';
  ```
  ⚠️ **Note**: React Native might still need React import. Test after removing.

- **Option B**: Suppress the warning by adding to biome.json:
  ```json
  "overrides": [
    {
      "includes": ["packages/mobile-app/src/MobileApp.tsx"],
      "linter": {
        "rules": {
          "correctness": {
            "noUnusedImports": "off"
          }
        }
      }
    }
  ]
  ```

### 2. **`any` Types** (~50+ errors)
**Issue**: Many `any` types throughout the codebase (warnings treated as errors).

**Systematic Fix Approach**:

#### Step 1: Identify all `any` types
```bash
npm run lint 2>&1 | grep "noExplicitAny" | cut -d: -f1 | sort | uniq
```

#### Step 2: Fix by category:

**A. React Navigation Types** (MapScreen.tsx)
```tsx
// Current:
interface MapScreenProps {
  navigation: any;
  route: any;
}

// Fix:
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

interface MapScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}
```

**B. React Native Maps Event Types** (TerritoryMapView.tsx)
```tsx
// Current:
const handleMapPress = useCallback((event: any) => {
  const coordinate = event.nativeEvent.coordinate;
  // ...
}, []);

// Fix:
import { MapPressEvent } from 'react-native-maps';

const handleMapPress = useCallback((event: MapPressEvent) => {
  const coordinate = event.nativeEvent.coordinate;
  // ...
}, []);
```

**C. Component State Types** (MapScreen.tsx)
```tsx
// Current:
const [TerritoryMapView, setTerritoryMapView] = useState<any>(null);

// Fix:
import { ComponentType } from 'react';
const [TerritoryMapView, setTerritoryMapView] = useState<ComponentType<any> | null>(null);
// Or better:
type TerritoryMapViewComponent = React.ComponentType<any>;
const [TerritoryMapView, setTerritoryMapView] = useState<TerritoryMapViewComponent | null>(null);
```

**D. Service/Data Types** (TerritoryClaimModal.tsx, MapScreen.tsx)
```tsx
// Current:
runData: any;
onSuccess: (territory: any) => void;

// Fix: Import proper types from shared-core
import { RunSession } from '@runrealm/shared-core/services/run-tracking-service';
import { Territory } from '@runrealm/shared-core/services/territory-service';

interface TerritoryClaimModalProps {
  runData: RunSession;
  onSuccess: (territory: Territory) => void;
}
```

**E. Expo Task Manager Types** (BackgroundTrackingService.ts)
```tsx
// Current:
let TaskManager: any = null;
TaskManager.defineTask('BACKGROUND_LOCATION_TASK', async ({ data, error }: any) => {

// Fix:
import * as TaskManager from 'expo-task-manager';

type LocationTaskData = {
  locations: Array<{
    coords: {
      latitude: number;
      longitude: number;
      altitude: number | null;
      accuracy: number;
    };
    timestamp: number;
  }>;
};

TaskManager.defineTask('BACKGROUND_LOCATION_TASK', async ({ data, error }: TaskManager.TaskManagerTaskBody<LocationTaskData>) => {
  // ...
});
```

**F. Dynamic Import Types** (MobileApp.tsx, BackgroundTrackingService.ts)
```tsx
// Current:
let AchievementService: any = null;

// Fix:
import type { AchievementService as AchievementServiceType } from '@runrealm/shared-core/services/achievement-service';

let AchievementService: typeof AchievementServiceType | null = null;
```

### 3. **Unused Function Parameters** (2 errors)
**Issue**: `navigation` and `route` parameters in MapScreen.tsx are unused.

**Fix Options**:

**Option A**: Prefix with underscore (convention for intentionally unused)
```tsx
const MapScreen: React.FC<MapScreenProps> = ({ navigation: _navigation, route: _route }) => {
  // ...
};
```

**Option B**: Remove if truly not needed (but keep for API compatibility)
```tsx
// Keep as-is if these are required by React Navigation API
// Biome will warn but it's acceptable for API compatibility
```

**Option C**: Suppress for this specific case:
```json
"overrides": [
  {
    "includes": ["packages/mobile-app/src/screens/MapScreen.tsx"],
    "linter": {
      "rules": {
        "correctness": {
          "noUnusedFunctionParameters": "off"
        }
      }
    }
  }
]
```

## Recommended Fix Order

1. **Quick Wins** (5 minutes):
   - Fix unused imports (MobileApp.tsx React import)
   - Fix unused catch variables (already done)

2. **Medium Effort** (30-60 minutes):
   - Fix React Navigation types (MapScreen.tsx)
   - Fix React Native Maps event types (TerritoryMapView.tsx)
   - Fix component state types (MapScreen.tsx)

3. **Longer Effort** (1-2 hours):
   - Fix service/data types (import proper types from shared-core)
   - Fix Expo Task Manager types
   - Fix dynamic import types

4. **Optional**:
   - Suppress warnings for API compatibility cases
   - Or prefix unused parameters with `_`

## Automated Fix Commands

```bash
# See all any types
npm run lint 2>&1 | grep "noExplicitAny"

# See all unused parameters
npm run lint 2>&1 | grep "noUnusedFunctionParameters"

# See all unused imports
npm run lint 2>&1 | grep "noUnusedImports"

# Apply auto-fixes (safe ones only)
npm run lint:fix
```

## Suppressing Warnings (Last Resort)

If some warnings are acceptable (e.g., API compatibility), add to `biome.json`:

```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "warn"  // Already set, but you can set to "off" for specific files
      },
      "correctness": {
        "noUnusedFunctionParameters": "off"  // For API compatibility cases
      }
    }
  },
  "overrides": [
    {
      "includes": ["**/screens/MapScreen.tsx"],
      "linter": {
        "rules": {
          "correctness": {
            "noUnusedFunctionParameters": "off"
          }
        }
      }
    }
  ]
}
```

## Testing After Fixes

After fixing types, always:
1. Run TypeScript compiler: `npm run build:shared`
2. Test the mobile app builds
3. Run tests: `npm test`

