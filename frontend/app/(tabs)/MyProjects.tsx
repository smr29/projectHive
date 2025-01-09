import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootTabParamList } from "@/navigation/types";
import { Appbar } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, "MyProjects">;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  status: string;
  createdBy: { usn: string };
};

export default function MyProjectsScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserProjects = async () => {
  
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); 
        if (storedUserId) {
          setUserId(storedUserId); 
          const response = await fetch("https://fa82-2409-40f2-129-fac4-fc8a-2113-6d5a-51ff.ngrok-free.app/project/get-all", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: storedUserId }) 
          });
  
          if (response.ok) {
            const data = await response.json();
            setProjects(data.projects); 
            console.log("Fetched Projects:", data.projects);
          } else {
            const errorData = await response.json();
            console.error("Error fetching projects:", errorData.message || "Unknown error");
          }
        } else {
          // console.error('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user ID or projects:', error);
      } 
    };
  
    fetchUserProjects();
  }, [userId, navigation]); 
  const renderProject = ({ item }: { item: Project }) => (
    <View style={styles.projectContainer}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
      <Text style={styles.projectInfo}>
        <Text style={styles.label}>Subject: </Text>
        {item.subject}
      </Text>
      <Text style={styles.projectInfo}>
        <Text style={styles.label}>Status: </Text>
        {item.status}
      </Text>
      <Text style={styles.projectInfo}>
        <Text style={styles.label}>Created By: </Text>
        {item.createdBy.usn}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
          <Appbar.Content title="My Projects" titleStyle={styles.headerTitle} />
        </Appbar.Header>

        {isLoading ? (
        <Text style={styles.loadingText}>Loading projects...</Text>
      ) : projects.length > 0 ? (
        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item._id} 
        />
      ) : (
        <Text style={styles.noProjectsText}>No projects found.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#057C7C",
    elevation: 4
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  noProjectsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  projectContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  projectDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  projectInfo: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
  },
});
