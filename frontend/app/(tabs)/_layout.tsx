import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './index';
import { View, Text } from 'react-native';
import ProjectStatus from './Status';
import AddProject from './AddProject';
import Projects from './MyProjects';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to Project Hive!</Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#057C7C' },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A0D8D0',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="ProjectStatus" 
        component={ProjectStatus} 
        options={{ title: 'Status' }}
      />
      <Tab.Screen 
        name="AddProject" 
        component={AddProject} 
        options={{ title: 'Add Project' }}
      />
      <Tab.Screen 
        name="MyProjects" 
        component={Projects} 
        options={{ title: 'My Projects' }}
      />
      <Tab.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }}
      />
    </Tab.Navigator>
  );
}
