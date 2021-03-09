import React from 'react';
import { getActiveChildNavigationOptions } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MyDonationScreen from '../screens/myDonationScreen';
import MyRequestScreen from '../screens/myRequestScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import { DonationNavigator } from './DonationNavigator';
import { RequestNavigator } from './RequestNavigator';

export const AppDrawerNavigator = createDrawerNavigator({
  Home:{
    screen : AppTabNavigator
    },
  Settings:{
    screen:SettingScreen
  },
  Notifications:{
    screen:NotificationScreen
  }, 
  MyDonations:{
    screen:DonationNavigator,
    navigationOptions:{
      drawerLabel:'My Donations'
    }
  },
  MyRequests:{
    screen:RequestNavigator,
    navigationOptions:{
      drawerLabel:'My Requests'
    }
  }
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
