import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // Import the router
import axios from "axios"; // For API calls
import AsyncStorage from "@react-native-async-storage/async-storage"; // For token storage
import Cookies from "js-cookie"; // For web cookie handling (use only for web)

export default function LoginScreen() {
  const router = useRouter(); // Use the router for navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle Login and store token in cookies or AsyncStorage
  const handleLogin = async () => {
    setIsLoading(true);

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Send the login request to the API
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        { email, password },
        { withCredentials: true } // Ensure cookies are sent and received
      );

      const { token } = response.data;

      if (token) {
        // Store the token in AsyncStorage (for React Native)
        await AsyncStorage.setItem("authToken", token);

        // Optionally store token in cookies (for web)
        if (typeof window !== "undefined" && window.document) {
          Cookies.set("token", token);
        }

        // Navigate to the AddProject screen
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/AddProject");
      } else {
        Alert.alert("Error", "Token not found in response.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed", error);
      Alert.alert("Error", "Login failed. Please check your credentials.");
    }
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
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
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
            {isLoading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.replace("/RegisterScreen")} // Use router.replace for navigation
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
    backgroundColor: "#fff",
  },
  header: {
    padding: 24,
    backgroundColor: "#057C7C",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0F2F1",
  },
  form: {
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 24,
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#057C7C",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  loadingButton: {
    backgroundColor: "#A0D8D0", // Light teal when loading
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#6B7280",
  },
  link: {
    color: "#057C7C",
    fontWeight: "500",
  },
});
