import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import RegisterTeamScreen from "./AddProject";
import JoinTeamScreen from "./join";
import MyProjectsScreen from "./MyProjects";
import ProjectStatusScreen from "./Status";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#057C7C" },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#A0D8D0",
      }}
    >
      <Tab.Screen
        name="ProjectStatus"
        component={ProjectStatusScreen}
        options={{ title: "All Projects", 
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="question" size={24} color="white" />
          ),
         }}
      />
      <Tab.Screen
        name="AddProject"
        component={RegisterTeamScreen}
        options={{ title: "Add Project", 
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={24} color="white" />
          ),
         }}
      />
      <Tab.Screen
        name="MyProjects"
        component={MyProjectsScreen}
        options={{ title: "My Projects", 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="eye-outline" size={24} color="white" />
          ),
         }}
      />
      <Tab.Screen
        name="JoinTeam"
        component={JoinTeamScreen}
        options={{ title: "Join Team",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color="white" />
          ),
         }}
      />
    </Tab.Navigator>
  );
}