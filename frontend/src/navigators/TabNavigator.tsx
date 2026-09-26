import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ListaEntregasScreen from '../screens/ListaEntregasScreen';
import ResumenScreen from '../screens/ResumenScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ListaEntregas"
        component={ListaEntregasScreen}
        options={{
          title: 'Lista de Entregas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Resumen"
        component={ResumenScreen}
        options={{
          title: 'Resumen',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}