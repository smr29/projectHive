import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList } from '@/navigation/types';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, 'JoinTeam'>;
};

export default function JoinTeamScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    teamCode: '',
  });
  const [userId, setUserId] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); 
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          // console.error('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []); 

  const handleJoinTeam = async () => {
    const { teamCode } = formData;

    if (!teamCode) {
      Alert.alert('Error', 'Project Code is required.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    try {
      const response = await fetch('https://fa82-2409-40f2-129-fac4-fc8a-2113-6d5a-51ff.ngrok-free.app/project/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, code: teamCode }), 
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Failed to join the project.');
        return;
      }

      Alert.alert('Success', data.message);
      navigation.navigate('MyProjects');
    } catch (error) {
      console.error('Error joining project:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Join Project" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Project Code</Text>
          <TextInput
            style={styles.input}
            value={formData.teamCode}
            onChangeText={(text) => setFormData({ ...formData, teamCode: text })}
            placeholder="Enter project code"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleJoinTeam}>
          <Text style={styles.buttonText}>Join Team</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerTitle: { color: 'white', fontSize: 20 },
  header: {
    backgroundColor: '#057C7C',
  },
  form: { padding: 20 },
  inputContainer: { marginBottom: 16 },
  label: { color: '#374151', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#374151',
  },
  button: { backgroundColor: '#057C7C', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
