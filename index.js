// Kræves af React Navigation
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// Registrerer root-komponenten og sikrer korrekt setup i Expo/Native
registerRootComponent(App);
