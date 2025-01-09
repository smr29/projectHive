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
import * as Clipboard from 'expo-clipboard';

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
    created_by: "", 
    members: "",
    createdAt: new Date().toISOString(), 
  });
  const handleRegister = async () => {
    const { title, description, subject, status, created_by, members, code } =
      formData;

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

    const membersArray = members.split(",").map((usn) => usn.trim());

    try {
      const response = await axios.post(
        "https://fa82-2409-40f2-129-fac4-fc8a-2113-6d5a-51ff.ngrok-free.app/project/create",
        {
          title,
          description,
          subject,
          status,
          createdByUsn: created_by,
          membersUsn: membersArray, 
        }
      );

      if (response.status === 201) {
        const { project } = response.data;

        const message = project.code
        Alert.alert(
          "Project Code",
          message,
          [
            { text: "OK" },
            { text: "Copy", onPress: () => handleCopy(message) }
          ]
        );

        setFormData({
          title: "",
          description: "",
          subject: "",
          status: "",
          code: "",
          created_by: "", 
          members: "",
          createdAt: new Date().toISOString(),
        })

        navigation.navigate("MyProjects", { refresh: true });        
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

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copied to Clipboard", text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Add Project" titleStyle={styles.headerTitle} />
        </Appbar.Header>

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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register & Generate Code</Text>
        </TouchableOpacity>

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
