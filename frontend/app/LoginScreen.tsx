import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootTabParamList } from '@/navigation/types';
import { useRouter } from 'expo-router';

// type Props = {
//   navigation: NativeStackNavigationProp<RootTabParamList, 'Login'>;
// };

export default function LoginScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
<<<<<<< HEAD:frontend/app/(tabs)/login-sceen.tsx
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    // Example of handling login (add your own logic)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Home screen after successful login
      navigation.navigate('Home');
    }, 1000);
=======
    // Handle login logic here
    // navigation.navigate('Home');
    console.log('hi')
    router.push('/(tabs)/RegisterTeam')
>>>>>>> 555d82c24f49187233926f2593404bdea682fa11:frontend/app/LoginScreen.tsx
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input field"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            placeholder="Enter your password"
            secureTextEntry
            accessibilityLabel="Password input field"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.loadingButton]}
          onPress={handleLogin}
          disabled={isLoading} // Disable button while loading
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.replace('/RegisterScreen')}
        >
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    backgroundColor: '#057C7C',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0F2F1',
  },
  form: {
    padding: 24,
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
  },
  buttonContainer: {
    padding: 24,
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#057C7C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingButton: {
    backgroundColor: '#A0D8D0', // Light teal when loading
  },
  buttonText: {
    color: '#fff',
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
  link: {
    color: '#057C7C',
    fontWeight: '500',
  },
});
