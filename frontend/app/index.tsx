import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { Picker } from '@react-native-picker/picker';
import type { RootTabParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';

// type NavigationProps = NativeStackNavigationProp<RootTabParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const router = useRouter()
  // const navigation = useNavigation<NavigationProps>();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    // <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={[styles.scrollContent, { minHeight: screenHeight }]}>
      
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>p</Text>
              </View>
              <Text style={styles.logoTitle}>ProjectHive</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Image
              source={require('@/assets/images/PM.png')}
              style={[styles.illustration, { width: screenWidth * 0.75 }]} 
              accessible
              accessibilityLabel="Welcome Illustration"
            />
          </View>

          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.projectHiveText}>
              Welcome to ProjectHive!
            </ThemedText>
            {/* <HelloWave /> */}
          </ThemedView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/LoginScreen')}
              accessible
              accessibilityLabel="Navigate to Login"
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryButton, styles.secondaryButton]}
              onPress={() => router.push('/RegisterScreen')}
              accessible
              accessibilityLabel="Navigate to register"
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    // </NavigationContainer> 
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
    paddingBottom: 32,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 60,  
    height: 60, 
    borderRadius: 30, 
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
    backgroundColor: 'none'
  },
  projectHiveText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 18,
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
