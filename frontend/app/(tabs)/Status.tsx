import { RootTabParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Appbar, Card, IconButton } from "react-native-paper";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  subject: string;
}

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, "ProjectStatus">;
};

const ProjectStatusScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://fa82-2409-40f2-129-fac4-fc8a-2113-6d5a-51ff.ngrok-free.app/project/all"); 
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#057C7C" />
        <Text style={styles.loadingText}>Loading projects...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="View All Projects" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {projects.map((project) => (
          <Card key={project._id} style={styles.card}>
            <View key={project._id} style={styles.cardContent}>
              <View style={styles.projectDetails}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.badge,
                    project.status === "Ongoing"
                      ? styles.badgeOngoing
                      : project.status === "Completed"
                      ? styles.badgeCompleted
                      : styles.badgePending,
                  ]}
                >
                  <Text style={styles.badgeText}>{project.status}</Text>
                </View>
                <IconButton
                  icon="eye"
                  size={24}
                  onPress={() => openModal(project)}
                  style={styles.viewButton}
                />
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      {selectedProject && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedProject.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedProject.subject}
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={closeModal}
              style={styles.closeModalButton}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { backgroundColor: "#057C7C", elevation: 4 },
  headerTitle: { color: "white", fontSize: 20 },
  scrollContainer: { paddingBottom: 16 },
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#FFFFFF",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  projectDetails: { flex: 1 },
  projectTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  projectDescription: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 80,
    marginRight: 10,
  },
  badgeText: { fontSize: 12, color: "white", textAlign: "center" },
  badgeOngoing: { backgroundColor: "#F59E0B" },
  badgeCompleted: { backgroundColor: "#10B981" },
  badgePending: { backgroundColor: "#EF4444" },
  viewButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0F2F1",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalDescription: { fontSize: 16, color: "#6B7280", marginBottom: 20 },
  closeModalButton: {
    marginTop: 20,
    width: "80%",
    borderRadius: 25,
    backgroundColor: "#057C7C",
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#6B7280" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
});

export default ProjectStatusScreen;
