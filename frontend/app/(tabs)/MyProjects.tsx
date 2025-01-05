import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootTabParamList } from "@/navigation/types";
import { Appbar } from "react-native-paper";

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
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://192.168.29.98:8000/project/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
          console.log("Projects:", data.projects);
        } else {
          const errorData = await response.json();
          console.log("Error:", errorData);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    fetchUser();
  }, [projects]);

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
          keyExtractor={(item) => item._id} // Use _id as the key
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
