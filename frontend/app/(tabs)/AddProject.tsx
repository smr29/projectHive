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
    projectDescription: '',
    teamSize: '',
    status: '',
    members: [{ name: '', usn: '' }],
  });

  const [allUSNs, setAllUSNs] = useState<string[]>([]);
  const [teamCode, setTeamCode] = useState<string>('');  // Store the generated code

  const generateTeamCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

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
    const { course, projectName, projectDescription, teamSize, status, members } = formData;

    if (!course || !projectName || !projectDescription || !teamSize || !status || members.some(member => !member.name || !member.usn)) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const memberUSNs = members.map(member => member.usn);
    const duplicateUSNs = memberUSNs.filter((usn, index) => memberUSNs.indexOf(usn) !== index);
    if (duplicateUSNs.length > 0) {
      Alert.alert('Error', 'Duplicate USNs found within the team.');
      return;
    }

    const duplicateInCourse = members.some(member => allUSNs.includes(member.usn));
    if (duplicateInCourse) {
      Alert.alert('Error', 'One or more members are already part of another team in this course.');
      return;
    }

    // Generate team code and set it in the state
    const generatedCode = generateTeamCode();
    setTeamCode(generatedCode);

    // Add the new USNs to the list of USNs in the course
    setAllUSNs([...allUSNs, ...memberUSNs]);

    // Display success alert with the team code
    Alert.alert('Success', `Team registered successfully for course "${course}" with code: ${generatedCode}`);
    console.log(formData);
    navigation.navigate('Home');
  };

  const updateMember = (index: number, key: 'name' | 'usn', value: string) => {
    const updatedMembers = formData.members.map((member, i) =>
      i === index ? { ...member, [key]: value } : member
    );
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleGenerateCode = () => {
    const generatedCode = generateTeamCode();
    setTeamCode(generatedCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Team</Text>
          <Text style={styles.subtitle}>Fill in the details to register your team</Text>
        </View>

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
            <Text style={styles.label}>Project Description</Text>
            <TextInput
              style={styles.input}
              value={formData.projectDescription}
              onChangeText={(text) => setFormData({ ...formData, projectDescription: text })}
              placeholder="Enter project description"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Team Size</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.teamSize}
                onValueChange={(value) => setFormData({ ...formData, teamSize: value, members: [{ name: '', usn: '' }] })}
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

          {/* Add member button */}
          <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMember}>
            <Text style={styles.buttonText}>Add Member</Text>
          </TouchableOpacity>

          {/* Register button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Generate code button */}
          <TouchableOpacity style={styles.button} onPress={handleGenerateCode}>
            <Text style={styles.buttonText}>Generate Code</Text>
          </TouchableOpacity>

          {/* Display generated team code */}
          {teamCode && (
            <View style={styles.teamCodeContainer}>
              <Text style={styles.teamCodeText}>Your Team Code: {teamCode}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { flexGrow: 1, paddingBottom: 20, paddingTop: 10 },
  header: { backgroundColor: '#057C7C', padding: 24, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#E0F2F1', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  form: { padding: 20 },
  inputContainer: { marginBottom: 16 },
  label: { color: '#374151', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  pickerWrapper: { borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10, marginBottom: 16 },
  picker: { color: '#374151' },
  input: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#374151',
    marginBottom: 8, // Added margin for spacing
  },
  button: { backgroundColor: '#057C7C', padding: 10, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  addMemberButton: { backgroundColor: '#057C7C', padding: 10, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  memberContainer: { marginBottom: 16 },
  memberLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#057C7C' },
  teamCodeContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    alignItems: 'center',
  },
  teamCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
});
