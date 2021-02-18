import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config'



export default class MyHeader extends React.Component  {
  
  constructor(props){
    super(props);
    this.state = {
      notificationValue:0
    }
  }
  
  IconAndBadge = () => {
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969'
        onPress={() => this.props.navigation.navigate('Notifications') }/>
        
        <Badge value={this.state.notificationValue} containerStyle={{position:'absolute' , top:-10 , right:-3  }}/>
      </View>
    )
  }

  getNotificationValue(){
    db.collection('AllNotifications').where('receiverEmail', '==', firebase.auth().currentUser.email).where('status', '==', 'unread').get().then((snapshot) => {
      var NotificationValue;
      var AllNotifications = [];
      
      snapshot.docs.map((doc) => {

        AllNotifications.push(doc.data)
        NotificationValue = AllNotifications.length

      })

      this.setState({
        notificationValue:NotificationValue
      })

      //consoe.log(this.state.notificationValue)


    }) 
  }

  
  
  render(){
    this.getNotificationValue();
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        rightComponent={<this.IconAndBadge {...this.props}/> }
        backgroundColor = "#eaf8fe"
      />
    );
  }
};
