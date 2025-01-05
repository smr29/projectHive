import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Appbar } from "react-native-paper";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootTabParamList } from "@/navigation/types";
import axios from "axios";

type Props = {
  navigation: NativeStackNavigationProp<RootTabParamList, "AddProject">;
};

export default function RegisterTeamScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    status: "",
    code: "",
    created_by: "", // This could be the logged-in user or hardcoded for testing
    members: "",
    createdAt: new Date().toISOString(), // Set the creation date to current time
  });
  const handleRegister = async () => {
    const { title, description, subject, status, created_by, members, code } =
      formData;

    // Validate form inputs
    if (
      !title ||
      !description ||
      !subject ||
      !status ||
      !created_by ||
      !members
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Format members into an array (assumes comma-separated USNs)
    const membersArray = members.split(",").map((usn) => usn.trim());

    // Call generateTeamCode if code is not set
    if (!code) {
      generateTeamCode();
    }

    try {
      // Send data to the backend
      const response = await axios.post(
        "http://192.168.29.98:8000/project/create",
        {
          title,
          description,
          subject,
          status,
          createdByUsn: created_by, // Use correct key here
          membersUsn: membersArray, // Use correct key here
        }
      );

      // Handle successful registration
      if (response.status === 201) {
        const { project } = response.data;

        Alert.alert(
          "Success",
          `Team registered successfully for course "${subject}"\nProject Code: ${project.code}`
        );

        // Navigate to the next screen
        navigation.navigate("JoinTeam");
      }
    } catch (error: any) {
      console.error(
        "Error registering team:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  const generateTeamCode = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code }); // Set generated team code to state
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Add Project" titleStyle={styles.headerTitle} />
        </Appbar.Header>

        {/* Project Title */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Enter project title"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Project Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Project Description</Text>
          <TextInput
            style={styles.input}
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            placeholder="Enter project description"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Subject Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Course</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.subject}
              onValueChange={(value) =>
                setFormData({ ...formData, subject: value })
              }
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

        {/* Project Status */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Project Status</Text>
          <TextInput
            style={styles.input}
            value={formData.status}
            onChangeText={(text) => setFormData({ ...formData, status: text })}
            placeholder="Enter project status (started, ongoing, or finished)"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Created by */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Created By (Enter USN)</Text>
          <TextInput
            style={styles.input}
            value={formData.created_by}
            onChangeText={(text) =>
              setFormData({ ...formData, created_by: text })
            }
            placeholder="Enter USN"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Members */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Members (Enter USNs separated by commas)
          </Text>
          <TextInput
            style={styles.input}
            value={formData.members}
            onChangeText={(text) => setFormData({ ...formData, members: text })}
            placeholder="Enter team members"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register & Generate Code</Text>
        </TouchableOpacity>

        {/* Display generated team code */}
        {formData.code ? (
          <View style={styles.teamCodeContainer}>
            <Text style={styles.teamCodeText}>
              Your Team Code: {formData.code}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  header: {
    backgroundColor: "#057C7C",
    elevation: 4
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
  },
  inputContainer: { marginTop: 17, marginBottom: 15, marginHorizontal: 15 },
  label: { color: "#374151", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 10,
  },
  picker: { color: "#374151" },
  input: {
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#374151"    
  },
  button: {
    backgroundColor: "#057C7C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 30
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  teamCodeContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#E0F2F1",
    borderRadius: 10,
    alignItems: "center",
  },
  teamCodeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
});
