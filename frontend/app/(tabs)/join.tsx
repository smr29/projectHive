import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList } from '@/navigation/types';
import { Appbar } from 'react-native-paper';

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, 'JoinTeam'>;
};

export default function JoinTeamScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    teamCode: '',
  });

  const handleJoinTeam = () => {
    const { teamCode } = formData;

    if (!teamCode) {
      Alert.alert('Error', 'Both Team Code and USN are required.');
      return;
    }

    // Mock logic to check if the team code and USN are valid
    const isValidTeamCode = teamCode.length === 6; // Example validation
    // const isValidUSN = usn.length === 10; // Example validation

    if (!isValidTeamCode) {
      Alert.alert('Error', 'Invalid Team Code.');
      return;
    }

    // if (!isValidUSN) {
    //   Alert.alert('Error', 'Invalid USN.');
    //   return;
    // }

    // If valid, proceed to join the team
    Alert.alert('Success', `Successfully joined the team with code: ${teamCode}`);
    // navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        {/* <Appbar.Action icon="menu" onPress={() => {}} /> */}
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

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>USN</Text>
          <TextInput
            style={styles.input}
            value={formData.usn}
            onChangeText={(text) => setFormData({ ...formData, usn: text })}
            placeholder="Enter your USN"
            placeholderTextColor="#9CA3AF"
          />
        </View> */}

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
    
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#E0F2F1', fontSize: 16, textAlign: 'center' },
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
