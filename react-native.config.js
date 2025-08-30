module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: {
          project: 'ios/ViorraApp.xcodeproj',
          xcodeprojPath: 'ios/ViorraApp.xcodeproj',
          plist: [],
          libraryFolder: 'Libraries',
        },
      },
    },
  },
  assets: ['./src/assets/fonts/'],
};