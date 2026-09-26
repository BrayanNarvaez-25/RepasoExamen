import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import ProfileScreen from '../screens/ProfileScreen';
import TabNavigator from './TabNavigator';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        drawerActiveBackgroundColor: colors.primaryLight,
        drawerActiveTintColor: colors.primaryDark,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontSize: 14, fontWeight: '600' },
        drawerStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="MiPerfil"
        component={ProfileScreen}
        options={{
          title: 'Mi Perfil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="GestionEntregas"
        component={TabNavigator}
        options={{
          title: 'Gestión de Entregas',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}