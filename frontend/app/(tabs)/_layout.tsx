import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import LoginScreen from './login-sceen';  // Corrected the file name import
import AddEditView from './AddEditView';  // Import Add/Edit View

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Transparent background effect for iOS
          },
          default: {},
        }),
      }}>
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* Explore Screen */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      {/* Register Team Screen */}
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register Team',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.3.fill" color={color} />,
        }}
      />

      {/* Login Screen */}
      <Tabs.Screen
        name="login"
        component={LoginScreen}  // Connect your Login Screen here
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.circle.fill" color={color} />,
        }}
      />

      {/* Add/Edit View Screen */}
      <Tabs.Screen
        name="addedit"
        component={AddEditView}  // Connect your Add/Edit View screen here
        options={{
          title: 'Add/Edit',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
