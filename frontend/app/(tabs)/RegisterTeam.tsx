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
    const updatedMembers = formData.members.map((member, i) =>
      i === index ? { ...member, [key]: value } : member
    );
    setFormData({ ...formData, members: updatedMembers });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Register Team</Text>
          <Text style={styles.subtitle}>Fill in the details to register your team</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerWrapper}>
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
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Project Name</Text>
            <TextInput
              style={styles.input}
              value={formData.projectName}
              onChangeText={(text) => setFormData({ ...formData, projectName: text })}
              placeholder="Enter project name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Team Size</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.teamSize}
                onValueChange={(value) =>
                  setFormData({ ...formData, teamSize: value, members: [{ name: '', usn: '' }] })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select team size" value="" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
              </Picker>
            </View>
          </View>

          {formData.members.map((member, index) => (
            <View key={index} style={styles.memberContainer}>
              <Text style={styles.memberLabel}>Member {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={member.name}
                onChangeText={(text) => updateMember(index, 'name', text)}
                placeholder="Enter member name"
                placeholderTextColor="#9CA3AF"
              />
              <TextInput
                style={styles.input}
                value={member.usn}
                onChangeText={(text) => updateMember(index, 'usn', text)}
                placeholder="Enter USN"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          ))}

          {/* Add Member */}
          {formData.teamSize && formData.members.length < Number(formData.teamSize) && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
              <Text style={styles.addButtonText}>+ Add Member</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Buttons */}
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  header: { backgroundColor: '#057C7C', padding: 24, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#E0F2F1', fontSize: 16, textAlign: 'center' },
  form: { padding: 20 },
  inputContainer: { marginBottom: 16 },
  label: { color: '#374151', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  pickerWrapper: { borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10, backgroundColor: '#F1F5F9' },
  picker: { color: '#374151' },
  input: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#374151',
  },
  memberContainer: { marginBottom: 16 },
  memberLabel: { color: '#057C7C', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  addButton: { backgroundColor: '#057C7C', padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  buttonContainer: { paddingHorizontal: 20 },
  button: { backgroundColor: '#057C7C', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  linkButton: { marginTop: 10, alignItems: 'center' },
  linkText: { color: '#6B7280', fontSize: 14 },
});
