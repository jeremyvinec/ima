/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app/app';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
