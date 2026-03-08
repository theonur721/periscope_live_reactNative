import { PermissionsAndroid, Platform } from 'react-native';

export const requestAVPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  const cam = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  const mic = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  );

  const granted =
    cam === PermissionsAndroid.RESULTS.GRANTED &&
    mic === PermissionsAndroid.RESULTS.GRANTED;

  console.log('🎛️ PERMISSIONS -> cam:', cam, 'mic:', mic, 'granted:', granted);
  return granted;
};
