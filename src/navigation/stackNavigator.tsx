import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home.screen';
import DetalleScreen from '../screens/detalle.screen';
import { SimplePokemon } from '../interfaces/pokemonPageResponse.interface';

export type RootStackParams = {
  Home: undefined,
  Detalle: { item: SimplePokemon, color: string }
}

export default function StackNavigator() {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalle" component={DetalleScreen} />
    </Stack.Navigator>
  );
}
