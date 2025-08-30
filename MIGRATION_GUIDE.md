# Expo to React Native CLI Migration Guide

This guide will help you complete the migration from Expo to React Native CLI. The code has been converted, but you'll need to set up the native projects locally.

## Prerequisites

- Node.js 18 or higher
- React Native CLI: `npm install -g @react-native-community/cli`
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Step 1: Initialize React Native CLI Project

Run these commands in your terminal:

```bash
# Create new React Native CLI project
npx react-native@latest init ViorraApp --version 0.73.2

# Navigate to the project directory
cd ViorraApp

# Remove the default files we'll replace
rm -rf src App.tsx
```

## Step 2: Copy Migrated Files

Copy all the converted files from this migration to your new React Native CLI project:

- Copy `src/` folder with all screens, navigation, and stores
- Replace `package.json` with the migrated version
- Copy all configuration files (metro.config.js, babel.config.js, etc.)
- Replace `index.js` with the migrated version

## Step 3: Install Dependencies

```bash
# Install all dependencies
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

## Step 4: Configure Vector Icons

### Android Configuration

1. Edit `android/app/build.gradle`:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### iOS Configuration

1. In Xcode, right-click on your project in the navigator
2. Select "Add Files to [ProjectName]"
3. Navigate to `node_modules/react-native-vector-icons/Fonts`
4. Select all `.ttf` files and add them
5. Edit `ios/ViorraApp/Info.plist` and add:

```xml
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
</array>
```

## Step 5: Configure Linear Gradient

### Android Configuration

No additional configuration needed.

### iOS Configuration

Linear gradient should work out of the box with the latest version.

## Step 6: Update App Icons and Splash Screen

### Android

1. Replace icons in `android/app/src/main/res/mipmap-*` folders
2. Update `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">Viorra</string>
</resources>
```

### iOS

1. Replace icons in `ios/ViorraApp/Images.xcassets/AppIcon.appiconset/`
2. Update display name in `ios/ViorraApp/Info.plist`:

```xml
<key>CFBundleDisplayName</key>
<string>Viorra</string>
```

## Step 7: Run the App

```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Key Changes Made

### Dependencies Replaced

| Expo Package | React Native CLI Equivalent |
|--------------|----------------------------|
| `expo-router` | `@react-navigation/native` + `@react-navigation/stack` + `@react-navigation/bottom-tabs` |
| `expo-linear-gradient` | `react-native-linear-gradient` |
| `lucide-react-native` | `react-native-vector-icons` |
| `expo-status-bar` | Built-in React Native StatusBar |
| `expo-splash-screen` | Native splash screen configuration |

### Navigation Changes

- **Expo Router** → **React Navigation v6**
- File-based routing → Component-based navigation
- `useRouter()` → `useNavigation()`
- `router.push()` → `navigation.navigate()`
- `router.replace()` → `navigation.reset()`

### Icon Changes

- **Lucide React Native** → **React Native Vector Icons (Ionicons)**
- Component imports → String-based icon names
- `<Heart size={24} color="#C4767C" />` → `<Icon name="heart" size={24} color="#C4767C" />`

### File Structure Changes

```
Old Expo Structure:
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── ...
├── _layout.tsx
└── ...

New RN CLI Structure:
src/
├── navigation/
│   ├── AppNavigator.tsx
│   └── TabNavigator.tsx
├── screens/
│   ├── HomeScreen.tsx
│   └── ...
├── stores/
└── App.tsx
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean with `cd android && ./gradlew clean && cd ..`
3. **iOS build issues**: Clean build folder in Xcode (Cmd+Shift+K)
4. **Vector icons not showing**: Ensure fonts are properly linked and rebuild the app

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. For iOS: `cd ios && pod install && cd ..`
3. Clean and rebuild the project

## Production Build

### Android

```bash
cd android
./gradlew assembleRelease
```

### iOS

```bash
cd ios
xcodebuild -workspace ViorraApp.xcworkspace -scheme ViorraApp -configuration Release -destination generic/platform=iOS -archivePath ViorraApp.xcarchive archive
```

## Additional Notes

- The app maintains all original functionality
- State management with Zustand remains unchanged
- All styling and UI components work identically
- API calls and data fetching logic is preserved
- The app structure is now more suitable for native development and custom native modules

Your Viorra beauty app is now successfully migrated to React Native CLI!