import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import MyDonationScreen from '../screens/myDonationScreen';
import RedirectScreen from '../screens/myDonationRedirectScreen';

export const DonationNavigator = createStackNavigator({
    MyDonations:{
        screen:MyDonationScreen,
        navigationOptions:{
            headerShown:false,
        }
    },
    DonationDetails:{
        screen:RedirectScreen,
        navigationOptions:{
            headerTitle:'Donation Details'
        }
    }
});