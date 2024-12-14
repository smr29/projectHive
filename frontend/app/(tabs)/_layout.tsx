// /app/tabs/_layout.tsx
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddEditView from './AddEditView';
import RegisterTeam from './RegisterTeam';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AddEdit" component={AddEditView} options={{ title: 'Add/Edit View' }} />
      <Tab.Screen name="Register" component={RegisterTeam} options={{ title: 'Register Team' }} />
    </Tab.Navigator>
  );
}
