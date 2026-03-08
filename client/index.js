/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-url-polyfill/auto';
import { registerGlobals } from '@livekit/react-native';

if (typeof global.Event === 'undefined') {
  global.Event = class Event {
    constructor(type, options) {
      this.type = type;
      this.bubbles = options?.bubbles ?? false;
      this.cancelable = options?.cancelable ?? false;
    }
  };
}

registerGlobals();

AppRegistry.registerComponent(appName, () => App);
