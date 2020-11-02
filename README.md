# Money Tracker

## Requirement
### Nodejs is installed.
1. Go to https://nodejs.org/en/, download "Recommend for Most Users"
2. Install
3. Try type `node` on cmd.
4. If not found:
   1. Try to add path manually on your environment variable

### Yarn is installed
1. Try type `yarn -v`
2. If error, try `npm install -g yarn`
3. Check again

### Expo CLI is installed
1. Try type `expo -V`
2. If error, try `npm install --global expo-cli`
3. Check again

### Check android emulator is created
1. If not yet created an android emulator, go to https://developer.android.com/studio/run/managing-avds
2. Follow the step.
3. Create an emulator

## Installation
1. Open terminal.
2. Type `git clone https://github.com/lee1409/money-tracker`
3. Then `cd money-tracker`
4. Then `yarn`

## Usage
1. Then `expo start`
2. A browser will pop up to open expo interface.
3. Open android emulator.
4. Click 'run on Android Emulator'.
5. Wait android emulator to load.
6. The app may start automatically.

### To run manually
7. Click 'Expo' app from the emulator.
8. Copy the connection URL. You can find it from expo interface.
9. The clipboards section will list out your URL.
10. Click "Open from Clipboard" on android emulator.

### Start emulator
1. Make sure env is set
   1. `$ANDROID_SDK_ROOT/emulator`
   2. `$ANDROID_SDK_ROOT/tools`
2. Run `yarn emulator:start`

## React Native Debugger
1. Download RND https://github.com/jhen0409/react-native-debugger/releases/tag/v0.11.5
2. Open App on emulator
3. Enable JS Debug
4. Close http://localhost:8081/debugger-ui window if pop up
5. Open RND
6. If port is not 19001, `Ctrl + T` to set up new connection
