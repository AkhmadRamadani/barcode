import React from 'react'
// import { AsyncStorage } from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import AsyncStorage from '@react-native-community/async-storage';
 
// ********************************************************************************
// * Import Screen
// ********************************************************************************

import RegisterScreen from "../controllers/Register";
import MainScreen from "../controllers/MainView";

// ********************************************************************************
// * Main Drawer Navigator
// ********************************************************************************

export const MainNavigator = (auth) => {
    return createAppContainer(
        createStackNavigator({
            
            Register: {
                screen: RegisterScreen
            },
            Main: {
                screen: MainScreen
            }

        },{
            defaultNavigationOptions: {
                header: null
            },
            initialRouteName: 'Register'
        })
    )
}