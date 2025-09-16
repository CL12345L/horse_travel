// App-indgang: Login-flow + Tab-navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OverviewScreen from './src/screens/OverviewScreen';
import PlanScreen from './src/screens/PlanScreen';
import TransportsScreen from './src/screens/TransportsScreen';
import LoginScreen from './src/screens/LoginScreen';
import TransportDetailScreen from './src/screens/TransportDetailScreen';
import FormsScreen from './src/screens/FormsScreen';
import { TransportProvider } from './src/store/TransportContext';
import { AuthProvider, useAuth } from './src/store/AuthContext';
import { colors } from './src/styles/styles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Simpel tom skærm til loading (for at undgå inline-funktion advarsel)
function LoadingScreen() { return null; }

// Faner synlige efter login
function MainTabs(){
  // Opsætter bund-navigationen med faner og ikoner
  return (
    <Tab.Navigator
      initialRouteName="Overblik"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ color, size, focused }) => {
          // Oversætter rutenavn til korrekt MaterialCommunityIcons-ikon
          let icon = 'circle-outline';
          if (route.name === 'Overblik') icon = focused ? 'horse-variant' : 'horse-variant';
          if (route.name === 'Ny tur') icon = focused ? 'car-side' : 'car-side';
          if (route.name === 'Historik') icon = focused ? 'history' : 'history';
          if (route.name === 'Formularer') icon = focused ? 'file-document' : 'file-document-outline';
          return <MaterialCommunityIcons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Overblik" component={OverviewScreen} />
      <Tab.Screen name="Ny tur" component={PlanScreen} />
      <Tab.Screen name="Historik" component={TransportsScreen} />
      <Tab.Screen name="Formularer" component={FormsScreen} />
    </Tab.Navigator>
  );
}

// Vælger mellem Login og selve appen
function RootNavigator(){
  const { user, ready } = useAuth();
  return (
    <Stack.Navigator>
      {!ready ? (
        // Viser en tom skærm mens login-status indlæses fra AsyncStorage
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown:false }} />
      ) : user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown:false }} />
          <Stack.Screen name="TransportDetail" component={TransportDetailScreen} options={{ title:'Transportdokument' }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TransportProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </TransportProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
