import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { Appbar, Card, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, 'ProjectStatus'>;
};

type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  documents: { name: string; uri: string }[];
};

export default function ProjectStatusScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Tax Tracker App',
      description: 'A simplified solution to track and manage tax payments.',
      startDate: '2024-12-01',
      endDate: '2024-12-30',
      dueDate: '2024-12-30',
      documents: [],
    },
  ]);

  const handleUploadDocument = async (projectId: string) => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === 'success') {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, documents: [...project.documents, { name: result.name, uri: result.uri }] }
            : project
        )
      );
      Alert.alert('Success', 'Document uploaded successfully.');
    }
  };

  const renderProjectItem = ({ item }: { item: Project }) => (
    <Card style={styles.projectCard}>
      <Text style={styles.projectTitle}>{item.name}</Text>
      <Text style={styles.projectDetails}>Description: {item.description}</Text>
      <Text style={styles.projectDetails}>Start Date: {item.startDate}</Text>
      <Text style={styles.projectDetails}>End Date: {item.endDate}</Text>
      <Text style={styles.projectDetails}>Due Date: {item.dueDate}</Text>
      <Text style={styles.projectDetails}>
        Days Remaining:{' '}
        {Math.max(
          Math.ceil((new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
          0
        )}
      </Text>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleUploadDocument(item.id)}
        >
          <Text style={styles.buttonText}>Upload Document</Text>
        </TouchableOpacity>
      </View>

      {/* Uploaded Documents */}
      <Text style={styles.documentsHeader}>Uploaded Documents:</Text>
      {item.documents.length === 0 ? (
        <Text style={styles.noDocumentsText}>No documents uploaded yet.</Text>
      ) : (
        item.documents.map((doc, index) => (
          <Text key={index} style={styles.documentName}>
            - {doc.name}
          </Text>
        ))
      )}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Project Status" titleStyle={styles.headerTitle} />
      </Appbar.Header>

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
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  uploadButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  documentsHeader: {
    fontSize: 16,
    color: '#374151',
    marginTop: 16,
    fontWeight: '600',
  },
  noDocumentsText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  documentName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 32,
  },
});
