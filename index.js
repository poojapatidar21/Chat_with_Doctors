/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import main from './src/components/main';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => main);
