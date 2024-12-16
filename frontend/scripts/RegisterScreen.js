import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');

  const handleRegister = () => {
    // Simple validation to check if all fields are filled
    if (!name || !usn || !branch || !semester) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    // Here you can add the logic to send the data to a server or save it locally
    Alert.alert('Success', 'Registration Successful');
    // Optionally, navigate to another screen, for example, a login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your USN"
        value={usn}
        onChangeText={setUsn}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Branch"
        value={branch}
        onChangeText={setBranch}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Semester"
        value={semester}
        onChangeText={setSemester}
      />

      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
        color="#057C7C"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 5,
    fontSize: 16,
    color: '#374151',
  },
});

export default RegisterScreen;
