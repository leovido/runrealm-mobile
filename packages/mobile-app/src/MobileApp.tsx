/**
 * MobileApp - Main navigation component
 * Uses actual screen components from src/screens/
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import MobileOnboarding from './components/MobileOnboarding';
import { DashboardScreen } from './screens/DashboardScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import MapScreen from './screens/MapScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { RunDetailScreen } from './screens/RunDetailScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MobileApp() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if onboarding should be shown
    // This will be handled by MobileOnboarding component itself
  }, []);

  // History Stack Navigator (for RunDetailScreen)
  const HistoryStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="HistoryList" component={HistoryScreen} options={{ title: 'History' }} />
      <Stack.Screen
        name="RunDetail"
        component={RunDetailScreen}
        options={{ title: 'Run Details' }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
          },
          tabBarActiveTintColor: '#00ff88',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Map' }} />
        <Tab.Screen name="History" component={HistoryStack} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
      <MobileOnboarding
        onComplete={() => setShowOnboarding(false)}
        onSkip={() => setShowOnboarding(false)}
      />
    </NavigationContainer>
  );
}
