import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../index';
import { View, Text } from 'react-native';
import ProjectStatus from './Status';
import AddProject from './AddProject';
import Projects from './MyProjects';
import JoinTeamScreen from './join';
import ProjectStatusScreen from './MyProjects';
import MyProjectsScreen from './Status';
// import LoginScreen from '../LoginScreen';
// import RegisterScreen from '../RegisterScreen';

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
        name="JoinTeam" 
        component={JoinTeamScreen} 
        options={{ title: 'Join Team' }}
      />
      <Tab.Screen 
        name="ViewProjects" 
        component={MyProjectsScreen} 
        options={{ title: 'View Projects' }}
      />
      <Tab.Screen 
        name="AddProject" 
        component={AddProject} 
        options={{ title: 'Add Project' }}
      />
      <Tab.Screen 
        name="MyProjects" 
        component={ProjectStatusScreen} 
        options={{ title: 'My Projects' }}
      />
      {/* <Tab.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }}
      /> */}
    </Tab.Navigator>
  );
}
