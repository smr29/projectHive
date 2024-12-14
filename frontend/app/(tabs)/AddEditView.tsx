import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Appbar, Card, List } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Projects'>;
};

type Project = {
  id: string;
  name: string;
  course: string;
  teamSize: number;
  members: { name: string; usn: string }[];
};

export default function ProjectsScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
    Alert.alert('Success', 'Project deleted successfully.');
  };

  const renderProjectItem = ({ item }: { item: Project }) => (
    <Card style={styles.projectCard}>
      <Text style={styles.projectTitle}>{item.name}</Text>
      <Text style={styles.projectDetails}>Course: {item.course}</Text>
      <Text style={styles.projectDetails}>Team Size: {item.teamSize}</Text>
      <Text style={styles.projectDetails}>Members:</Text>
      {item.members.map((member, index) => (
        <Text key={index} style={styles.memberDetails}>
          - {member.name} ({member.usn})
        </Text>
      ))}

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProject', { project: item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteProject(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Projects" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProject')}
        >
          <Text style={styles.addButtonText}>+ Add Project</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProjectItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No projects found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#057C7C',
    elevation: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  projectCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  projectDetails: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  memberDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 32,
  },
});
