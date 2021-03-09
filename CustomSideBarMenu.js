import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import db from '../config'

export default class CustomSideBarMenu extends Component{

  constructor(){
    super();
    this.state = {
      imageURI:'',
      userId:firebase.auth().currentUser.email,
      name:''
    }
  }

  fetchImage = async(userId) => {
    firebase.storage().ref().child('PFP/' + userId).getDownloadURL().then((uri) => {
      this.setState({
        imageURI:uri
      })
    }).catch((error) => {
      this.setState({
        imageURI:'#'
      })
    })
  }

  uploadImage = async(uri, userId) => {
    var response = await fetch(uri)
    var blob = await response.blob()

    var ref = firebase.storage().ref().child('PFP/' + userId)

    return(
      ref.put(blob).then((response) => {
        this.fetchImage(userId);
      })
    );

  }

  selectPicture = async() => {
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
      quality:0.5
    })

    if(cancelled !== true){
      this.uploadImage(uri, this.state.userId);
    }
  }

  componentDidMount(){
    this.fetchImage(this.state.userId);
    
    db.collection('User').where('emailId', '==', this.state.userId).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          name:doc.data().FirstName + ' ' + doc.data().LastName
        })
      })
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:0.2,alignItems:'center',backgroundColor:'blue'}}>
          <Avatar rounded={true} source={{
            uri:this.state.imageURI
          }}
          containerStyle={styles.imageContainer}
          showEditButton={true}
          onPress={() => {
            this.selectPicture();
          }}/>
          <Text style={styles.text}>{this.state.name}</Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  imageContainer:{
    flex:0.90,
    width:'50%',
    height:'30%',
    marginTop:25
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  },
  text:{
    fontSize:22,
    color:'lime',
    fontWeight:'bold',
    textAlign:'center'
  }
})
