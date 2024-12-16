import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './scripts/LoginScreen';
import RegisterScreen from './scripts/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide header if not needed
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarStyle: { display: 'none' }, // Hide bottom tab bar for Login screen
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            tabBarStyle: { display: 'none' }, // Hide bottom tab bar for Register screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
