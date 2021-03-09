import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config'



export default class MyHeader extends React.Component  {
  
  constructor(props){
    super(props);
    this.state = {
      notificationValue:0,
      email:[]
    }
  }
  
  IconAndBadge = () => {
    return(
      <View>
        <Icon name={'bell'} type='font-awesome' color='#696969'
        onPress={() => this.props.navigation.navigate('Notifications') }/>
        
        <Badge value={this.state.notificationValue} containerStyle={{position:'absolute' , top:-10 , right:-3  }}/>
      </View>
    )
  }

  async getNotificationValue(){

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



    }) 
  }

  componentDidMount(){
    this.getNotificationValue();
  }
  
  render(){
    return (
      <Header
        leftComponent={
        <View style={{marginHorizontal:25,flexDirection:'row'}}>
          <View style={{flexDirection:'row',marginTop:2.5}}>
            <Icon name='bars' type='font-awesome' color='#696969' size={30}  onPress={() => this.props.navigation.toggleDrawer()}/>
          </View>
          <View style={{marginHorizontal:25,flexDirection:'row'}}>
            <Icon name='gear' type='font-awesome' color='#696969' size={35}  onPress={() => this.props.navigation.navigate('Settings')}/>
          </View>
        </View>}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:36,fontWeight:"bold",} }}
        rightComponent={
          <View style={{marginHorizontal:25,flexDirection:'row'}}>
            <View style={{flexDirection:'row'}}>
              <Icon name='home' type='font-awesome' color='#696969' size={35}  onPress={() => this.props.navigation.navigate('Home')}/>
            </View>
            <View style={{marginHorizontal:25,flexDirection:'row',marginTop:5}}>
              <this.IconAndBadge {...this.props}/>
            </View>
          </View>}
        backgroundColor = "#eaf8fe"
      />
    );
  }
};
