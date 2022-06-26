import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";
import { theme } from "../global/styles/theme";

import { Postos } from '../screens/Postos';
import { Combustiveis } from '../screens/Combustiveis';
import { CreditosPosto } from '../screens/CreditosPosto';
import { CombustivelPosto } from '../screens/CombustivelPosto';
import { Creditos } from '../screens/Creditos';
import { MinhaConta } from '../screens/MinhaConta';
import { Cadastrar } from '../screens/Cadastrar';
import { Login } from '../screens/Login';
import { UtilizarCredito } from '../screens/UtilizarCredito';

import userService from "../services/UserService";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs({navigation}){
    sair = () => {
        userService.logout;
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.amarelo,
                tabBarInactiveTintColor: theme.colors.preto,
                tabBarStyle:{
                    paddingBottom: 5,
                    paddingTop: 5,
                    backgroundColor: theme.colors.cinzatab
                },
                headerStyle:{
                    backgroundColor: theme.colors.cinzaescuro
                },
                headerTintColor: theme.colors.cinzabackground,
                headerTitleStyle:{
                    fontFamily: theme.fonts.raj_semibold,
                    fontSize: 18
                },
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen 
                name='Postos' 
                component={Postos}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcon name='store' size={size} color={color}/>
                    ),
                    headerTitle:'Postos de combustível'
                }}
            />
            <Tab.Screen 
                name='Combustiveis' 
                component={Combustiveis}
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome name='gas-pump' size={19} color={color}/>
                    ),
                    headerTitle:'Combustíveis'
                }}
            />
            <Tab.Screen 
                name='Creditos' 
                component={Creditos}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcon name='payment' size={size} color={color}/>
                    ),
                    headerTitle:'Carteira'
                }}
            />
            <Tab.Screen 
                name='Conta' 
                component={MinhaConta}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcon name='person' size={size} color={color}/>
                    ),
                    headerTitle:'Minha conta',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => sair()}>
                            <FontAwesome 
                                name='sign-out-alt' size={21} 
                                color={theme.colors.cinzatab} 
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export function Routes(){
    return(
        <NavigationContainer>

            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen 
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='Cadastrar'
                    component={Cadastrar}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='PostosdeCombustivel'
                    component={Tabs}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='CreditosPosto'
                    component={CreditosPosto}
                    options={{
                        title: 'Créditos',
                        headerStyle: {
                            backgroundColor: theme.colors.cinzaescuro
                        },
                        headerTitleStyle: {
                            fontSize: 18,
                            fontFamily: theme.fonts.raj_semibold
                        },
                        headerTintColor: theme.colors.branco
                    }}
                />
                <Stack.Screen 
                    name='CombustivelPosto'
                    component={CombustivelPosto}
                    options={{
                        title: 'Combustíveis',
                        headerStyle: {
                            backgroundColor: theme.colors.cinzaescuro
                        },
                        headerTitleStyle: {
                            fontSize: 18,
                            fontFamily: theme.fonts.raj_semibold
                        },
                        headerTintColor: theme.colors.branco
                    }}
                />
                <Stack.Screen 
                    name='UtilizarCredito'
                    component={UtilizarCredito}
                    options={{
                        title: 'Utilizar crédito(s)',
                        headerStyle: {
                            backgroundColor: theme.colors.cinzaescuro
                        },
                        headerTitleStyle: {
                            fontSize: 18,
                            fontFamily: theme.fonts.raj_semibold
                        },
                        headerTintColor: theme.colors.branco
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}