import { Project } from '@/navigation/types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { Appbar, Card, IconButton } from 'react-native-paper';

const MyProjectsScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: '1',
      title: 'Tax Tracker App',
      description: 'A simplified solution to track and manage tax payments.',
      status: 'Ongoing',
      subject: 'This project involves building a web app for tracking tax payments in a simplified manner.',
    },
    {
      id: '2',
      title: 'Project Hive',
      description: 'A project management tool for team collaboration.',
      status: 'Completed',
      subject: 'This is a tool for managing projects, with features such as task tracking and team communication.',
    },
    {
      id: '3',
      title: 'ByteXync Event Portal',
      description: 'An event management system for tech club events.',
      status: 'Ongoing',
      subject: 'A platform for organizing tech club events, managing registrations, and promoting activities.',
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'A personal portfolio to showcase projects and skills.',
      status: 'Pending',
      subject: 'A personal website to display your work, including projects, blogs, and contact information.',
    },
  ];

  const openModal = (project:any) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        {/* <Appbar.Action icon="menu" onPress={() => {}} /> */}
        <Appbar.Content title="View Projects" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {/* Projects List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {projects.map((project, index) => (
          <Card key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.projectDetails}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
              </View>
              {/* Status and View Button on the same line */}
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.badge,
                    project.status === 'Ongoing'
                      ? styles.badgeOngoing
                      : project.status === 'Completed'
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
                  // color="#057C7C"j
                />
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* Modal for viewing project details */}
      {selectedProject && (
        <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedProject}</Text>
            <Text style={styles.modalDescription}>{selectedProject}</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={closeModal}
              style={styles.closeModalButton}
              // color="#057C7C"
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { backgroundColor: '#057C7C', elevation: 4 },
  headerTitle: { color: 'white', fontSize: 20 },
  scrollContainer: { paddingBottom: 16 },
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  projectDetails: { flex: 1 },
  projectTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  projectDescription: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  statusContainer: {
    flexDirection: 'row', // Make status and View button appear in the same row
    alignItems: 'center', // Vertically center the elements
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 80, // Ensures badge has enough width for the text
    marginRight: 10, // Space between badge and view button
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  badgeOngoing: { backgroundColor: '#F59E0B' }, // Yellow for "Ongoing"
  badgeCompleted: { backgroundColor: '#10B981' }, // Green for "Completed"
  badgePending: { backgroundColor: '#EF4444' }, // Red for "Pending"
  viewButton: {
    width: 30, // Adjust the width for the icon button
    height: 30, // Adjust the height for the icon button
    borderRadius: 15, // Make the button circular
    backgroundColor: '#E0F2F1', // Light background color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  closeModalButton: {
    marginTop: 20,
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#057C7C',
  },
});

export default MyProjectsScreen;
