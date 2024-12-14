import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { Picker } from '@react-native-picker/picker';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { minHeight: screenHeight }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>p</Text>
            </View>
            <Text style={styles.logoTitle}>projectHive</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Image
            source={require('@/assets/images/PM.png')}
            style={[styles.illustration, { width: screenWidth * 0.75 }]}  // Responsive width
            accessible
            accessibilityLabel="Welcome Illustration"
          />
        </View>

        {/* Additional Content */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.projectHiveText}>
            Welcome to Project Hive!
          </ThemedText>
          <HelloWave />
        </ThemedView>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
            accessible
            accessibilityLabel="Navigate to Login"
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('SignUp')}
            accessible
            accessibilityLabel="Navigate to Sign Up"
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 32, // More space at the bottom for better balance
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Align logo to the left and title to the right
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 60,   // Increased size for better visibility
    height: 60,  // Keep width and height equal for a perfect circle
    borderRadius: 30,  // Half of width/height to make it a perfect circle
    backgroundColor: '#4ADE90',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    marginVertical: 20,
  },
  illustration: {
    height: 200,
    resizeMode: 'contain',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  projectHiveText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',  // Center align the title
    marginBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40, // Increased margin at the bottom
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 18, // More space between buttons
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#2563EB',
  },
});
