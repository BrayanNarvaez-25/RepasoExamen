import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import FormularioEntregaScreen from './src/screens/FormularioEntregaScreen';

export type RootStackParamList = {
  Drawer: undefined;
  FormularioEntrega: { entrega?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen
          name="FormularioEntrega"
          component={FormularioEntregaScreen}
          options={{ headerShown: true, title: 'Registrar Entrega' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}