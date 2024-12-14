// /app/tabs/_layout.tsx
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddEditView from './AddEditView';
import RegisterTeam from './RegisterTeam';

<<<<<<< HEAD
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import LoginScreen from './login-sceen';  // Corrected the file name import
import AddEditView from './AddEditView';  // Import Add/Edit View

export default function TabLayout() {
  const colorScheme = useColorScheme();
=======
const Tab = createBottomTabNavigator();
>>>>>>> 555d82c24f49187233926f2593404bdea682fa11

export default function TabsLayout() {
  return (
<<<<<<< HEAD
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
=======
    <Tab.Navigator>
      <Tab.Screen name="AddEdit" component={AddEditView} options={{ title: 'Add/Edit View' }} />
      <Tab.Screen name="Register" component={RegisterTeam} options={{ title: 'Register Team' }} />
    </Tab.Navigator>
>>>>>>> 555d82c24f49187233926f2593404bdea682fa11
  );
}
