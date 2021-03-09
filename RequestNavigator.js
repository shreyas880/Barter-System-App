import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import RequestRedirectScreen from '../screens/myRequestRedirectScreen';
import MyRequestScreen from '../screens/myRequestScreen';

export const RequestNavigator = createStackNavigator({
    MyRequests:{
        screen:MyRequestScreen,
        navigationOptions:{
            headerShown:false,
        }
    },
    RequestDetails:{
        screen:RequestRedirectScreen,
        navigationOptions:{
            headerTitle:'Donation Details'
        }
    }
});