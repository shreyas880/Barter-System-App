import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ItemDonateScreen from '../screens/ItemDonateScreen';
import ItemRequestScreen from '../screens/ItemRequestScreen';
import {createStackNavigator} from 'react-navigation-stack';
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen'
import MyDonationScreen from '../screens/myDonationScreen';

export const AppStackNavigator = createStackNavigator({
    ItemDonateList:{
      screen:ItemDonateScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    ReceiverDetails:{
      screen:ReceiverDetailsScreen,
      navigationOptions:{
        headerTitle:'Reciever Details'
      }
    },
  },
  {
    initialRouteName:'ItemDonateList'
  })