import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button } from 'react-native-paper';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={() => (
            <Image
              source={{
                uri: 'https://as1.ftcdn.net/v2/jpg/04/97/12/42/1000_F_497124214_j74XBvE7oV59ugnJkDUqQduXA5WbGxBV.jpg' // Replace with your logo URL or local file
              }}
              style={styles.logo}
            />
          )}
          onPress={() => {}}
          style={styles.logoAction}
        />
        <Appbar.Content title="Project Hive" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {/* Welcome Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Welcome to Project Hive</Text>
        <Text style={styles.subText}>Manage your projects seamlessly</Text>
      </View>

      {/* Features Overview */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.summaryContainer}>
          <Card style={[styles.summaryCard, styles.tealCard]}>
            <Title style={styles.cardTitle}>Track Tasks</Title>
            <Paragraph style={styles.cardText}>Monitor all project tasks efficiently</Paragraph>
          </Card>
          <Card style={[styles.summaryCard, styles.tealCard]}>
            <Title style={styles.cardTitle}>Collaborate</Title>
            <Paragraph style={styles.cardText}>Work with your team in real-time</Paragraph>
          </Card>
        </View>

        {/* Login/Sign Up Section */}
        <View style={styles.authSection}>
          <Text style={styles.authPrompt}>Get Started</Text>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonText}
            onPress={() => console.log('Login')}
          >
            Login
          </Button>
          <Button
            mode="outlined"
            style={styles.outlinedButton}
            labelStyle={styles.outlinedButtonText}
            onPress={() => console.log('Sign Up')}
          >
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#057C7C', elevation: 4 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  logo: { width: 40, height: 40, resizeMode: 'contain' }, // Ensure the logo fits well
  logoAction: { alignSelf: 'flex-start', padding: 8 }, // Position logo correctly
  greetingSection: { padding: 20, backgroundColor: '#057C7C', alignItems: 'center' },
  greetingText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subText: { fontSize: 16, color: 'white', marginTop: 5 },
  scrollContainer: { paddingBottom: 16 },
  authSection: { padding: 20, alignItems: 'center' },
  authPrompt: { fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#057C7C' },
  button: { marginVertical: 8, width: '80%', borderRadius: 25, backgroundColor: '#057C7C' },
  buttonText: { fontSize: 16, color: 'white' },
  outlinedButton: {
    marginVertical: 8,
    width: '80%',
    borderRadius: 25,
    borderColor: '#057C7C',
    borderWidth: 2,
  },
  outlinedButtonText: { fontSize: 16, color: '#057C7C' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 10,
    color: '#057C7C',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  summaryCard: {
    width: 150,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    borderRadius: 8,
  },
  tealCard: {
    backgroundColor: '#E0F2F1',
    borderColor: '#057C7C',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#057C7C',
  },
  cardText: { textAlign: 'center', color: '#057C7C' },
});

export default App;
