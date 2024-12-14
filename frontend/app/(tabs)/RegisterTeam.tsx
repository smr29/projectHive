import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList } from '@/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, 'Register'>;
};

export default function RegisterTeamScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    course: '',
    projectName: '',
    teamSize: '',
    members: [{ name: '', usn: '' }],
  });

  const handleAddMember = () => {
    if (formData.members.length < Number(formData.teamSize)) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: '', usn: '' }],
      });
    } else {
      Alert.alert('Error', `Team size cannot exceed ${formData.teamSize}`);
    }
  };

  const handleRegister = () => {
    const { course, projectName, teamSize, members } = formData;
    if (!course || !projectName || !teamSize || members.some(member => !member.name || !member.usn)) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    Alert.alert('Success', `Team registered successfully for course "${course}"`);
    console.log(formData);
    navigation.navigate('Home');
  };

  const updateMember = (index: number, key: 'name' | 'usn', value: string) => {
    const updatedMembers = formData.members.map((member, i) => (
      i === index ? { ...member, [key]: value } : member
    ));
    setFormData({ ...formData, members: updatedMembers });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Register Team</Text>
          <Text style={styles.subtitle}>Fill in the details to register your team</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course</Text>
            <Picker
              selectedValue={formData.course}
              onValueChange={(value) => setFormData({ ...formData, course: value })}
              style={styles.picker}
            >
              <Picker.Item label="Select a course" value="" />
              <Picker.Item label="MAD" value="MAD" />
              <Picker.Item label="AIML" value="AIML" />
              <Picker.Item label="Mini Project" value="MINIPROJECT" />
              <Picker.Item label="Elective" value="ELECTIVE" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Project Name</Text>
            <TextInput
              style={styles.input}
              value={formData.projectName}
              onChangeText={(text) => setFormData({ ...formData, projectName: text })}
              placeholder="Enter project name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Team Size</Text>
            <Picker
              selectedValue={formData.teamSize}
              onValueChange={(value) => {
                setFormData({ ...formData, teamSize: value, members: [{ name: '', usn: '' }] });
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select team size" value="" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
          </View>

          {formData.members.map((member, index) => (
            <View key={index} style={styles.memberContainer}>
              <Text style={styles.label}>Member {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={member.name}
                onChangeText={(text) => updateMember(index, 'name', text)}
                placeholder="Enter member name"
              />
              <TextInput
                style={styles.input}
                value={member.usn}
                onChangeText={(text) => updateMember(index, 'usn', text)}
                placeholder="Enter USN"
              />
            </View>
          ))}

          {formData.teamSize && formData.members.length < Number(formData.teamSize) && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
              <Text style={styles.addButtonText}>Add Member</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.linkText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  memberContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 24,
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
