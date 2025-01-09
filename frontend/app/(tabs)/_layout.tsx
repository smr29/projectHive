import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import RegisterTeamScreen from "./AddProject";
import JoinTeamScreen from "./join";
import MyProjectsScreen from "./MyProjects";
import ProjectStatusScreen from "./Status";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      const response = await axios.get("https://fa82-2409-40f2-129-fac4-fc8a-2113-6d5a-51ff.ngrok-free.app/auth/logout", {
        withCredentials: true, 
      });
  
      if (response.status === 200) {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userId");
  
        Alert.alert("Success", "Logged out successfully");
  
        router.push("/LoginScreen")
      } else {
        Alert.alert("Error", "Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "An error occurred during logout.");
    }
  };
  
  
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

    <Tab.Screen
        name="Logout"
        component={View} 
        options={{
          tabBarLabel: 'Logout',
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:5,
                marginHorizontal:0
              }}
              onPress={handleLogout}
            >
              <Ionicons name="log-out" size={24} color="white" />
              <Text style={{ color: 'white', fontSize: 10 }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}