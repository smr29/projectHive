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
import { Appbar } from 'react-native-paper';

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, 'RegisterTeam'>;
};

export default function RegisterTeamScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    description: '',
    teamSize: '',
    status: '',
  });

  const [allUSNs, setAllUSNs] = useState<string[]>([]);
  // const [teamCode, setTeamCode] = useState<string>('');  // Store the generated code

  // const generateTeamCode = () => {
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let code = '';
  //   for (let i = 0; i < 6; i++) {
  //     code += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return code;
  // };

  const handleRegister = () => {
    const { subject, name, description, teamSize, status } = formData;

    if (!subject || !name || !description || !teamSize || !status ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    // Display success alert with the team code
    Alert.alert('Success', `Team registered successfully for course "${subject}"`);
    console.log(formData);
    navigation.navigate('JoinTeam');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Add Team</Text>
          <Text style={styles.subtitle}>Fill in the details to register your team</Text>
        </View> */}
        <Appbar.Header style={styles.header}>
        {/* <Appbar.Action icon="menu" onPress={() => {}} /> */}
        <Appbar.Content title="Add Project" titleStyle={styles.headerTitle} />
      </Appbar.Header>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
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
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter project name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Project Description</Text>
            <TextInput
              style={styles.input}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter project description"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Team Size</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.teamSize}
                onValueChange={(value) => setFormData({ ...formData, teamSize: value})}
                style={styles.picker}
              >
                <Picker.Item label="Select team size" value="" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Project Status - started, ongoing or finished</Text>
            <TextInput
              style={styles.input}
              value={formData.status}
              onChangeText={(text) => setFormData({ ...formData, status: text })}
              placeholder="Enter project description"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register & Generate Code</Text>
          </TouchableOpacity>

          {/* Display generated team code */}
          {/* {teamCode && (
            <View style={styles.teamCodeContainer}>
              <Text style={styles.teamCodeText}>Your Team Code: {teamCode}</Text>
            </View>
          )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  header: {
    backgroundColor: '#057C7C',
    elevation: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
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
