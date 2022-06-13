/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BusquedaScreen from '../screens/busqueda.screen';
import StackNavigator, { RootStackParams } from './stackNavigator';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetalleScreen from '../screens/detalle.screen';

const Tab = createBottomTabNavigator();
export function TabStackNav() {
    const TabSackNavigator = createNativeStackNavigator<RootStackParams>();

    return (
        <TabSackNavigator.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <TabSackNavigator.Screen name="Busqueda" component={BusquedaScreen} />
            <TabSackNavigator.Screen name="Detalle" component={DetalleScreen} />
        </TabSackNavigator.Navigator>
    );
}

export default function App() {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10,
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(250,250,250,0.7)',
                    borderWidth: 0,
                    elevation: 0,
                    height: 60,
                    paddingTop: 10,
                },
            }}


        >
            <Tab.Screen
                name="StackNavigator"
                component={StackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Icon
                        name="list"
                        size={20}
                        color={color}
                    />,
                }}
            />
            <Tab.Screen
                name="TabStackNav"
                component={TabStackNav}
                options={{
                    tabBarLabel: 'Busqueda',
                    tabBarIcon: ({ color }) => <Icon
                        name="search"
                        size={20}
                        color={color}
                    />,
                }}
            />
        </Tab.Navigator>
    );
}
