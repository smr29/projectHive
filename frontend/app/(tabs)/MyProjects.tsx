import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';

const MyProjectsScreen = () => {
  const projects = [
    {
      title: 'Tax Tracker App',
      description: 'A simplified solution to track and manage tax payments.',
      status: 'Ongoing',
    },
    {
      title: 'Project Hive',
      description: 'A project management tool for team collaboration.',
      status: 'Completed',
    },
    {
      title: 'ByteXync Event Portal',
      description: 'An event management system for tech club events.',
      status: 'Ongoing',
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio to showcase projects and skills.',
      status: 'Pending',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="My Projects" titleStyle={styles.headerTitle} />
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
              {/* Custom Badge View */}
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
            </View>
          </Card>
        ))}
      </ScrollView>
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
  badge: {
    justifyContent: 'center', // Centers text vertically
    alignItems: 'center', // Centers text horizontally
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 80, // Ensures badge has enough width for the text
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  badgeOngoing: { backgroundColor: '#F59E0B' }, // Yellow for "Ongoing"
  badgeCompleted: { backgroundColor: '#10B981' }, // Green for "Completed"
  badgePending: { backgroundColor: '#EF4444' }, // Red for "Pending"
});

export default MyProjectsScreen;
