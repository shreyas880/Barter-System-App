import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import { Card } from 'react-native-paper';

export default class ReceiverDetailsScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            name:'',
            contact:'',
            address:'',
            lastName:'',
            reason:'',
            ItemName:'',
            donorEmail:'',
            donorName:'',
            receiverEmail:'',
            userId:'',
            requestId:Math.random().toString(36).substring(7)
        }
    }

    getDetails(){

      var item = this.props.navigation.getParam('details');


      db.collection('User').where('emailId', '==', item.userId).get().then((snapshot) => {
        snapshot.forEach((document) => {
          var docId;

          docId = document.id;


          db.collection('User').doc(docId).get().then((doc) => {
    
            var data = doc.data();
            console.log(this.state.requestId);

            this.setState({
                contact:data.ContactNo,
                name:data.FirstName,
                address:data.Address,
                lastName:data.LastName,
                donorEmail:firebase.auth().currentUser.email,
                ItemName:item.ItemName,
                reason:item.reason,
                receiverEmail:item.userId
            })
          })
        })
      })
    }


    addNotifications(){

      //alert(this.state.donorName);

    db.collection('AllNotifications').add({
      'senderEmail':this.state.donorEmail,
      'donorId':this.state.userId,
      'date':firebase.firestore.Timestamp.now().toDate(),
      'status':'unread',
      'Message':this.state.donorName + ' has Donated a Item',
      'targetEmail':this.state.receiverEmail,
      'requestId':this.state.requestId,
      'ItemName':this.state.ItemName
    })
    }

    updateDonations(){

        db.collection('User').where('emailId','==',firebase.auth().currentUser.email).get().then((snapshot) => {
          snapshot.forEach(async (doc) => {
            var data = doc.data();

            await this.setState({
              userId:doc.id,
              donorName: data['FirstName']
            })
            
            this.addNotifications();

          })
        })

        db.collection('Donations').add({
          'ItemStatus':'donated',
          'requestId':this.state.requestId,
          'ItemDonor':firebase.auth().currentUser.email,
          'ItemReceiver':this.state.receiverEmail,
          'ItemName':this.state.ItemName
        })

      }
      
    render(){
      this.getDetails();
      return(
        <View style={styles.container}>
          <Card style={{backgroundColor:'#F8BE85'}}>
            <Card.Title title={'Name:' + this.state.ItemName} 
            titleStyle={{fontSize:32,color:'red', fontWeight:'bold',margin:25,padding:25,textAlign:'center'}} 
            subtitle={'Reason: ' + this.state.reason}
            subtitleNumberOfLines={3} 
            subtitleStyle={{fontSize:24, color:'yellow',textAlign:'center',margin:25,padding:25}}>
            </Card.Title>
            <Card.Content style={{alignSelf:'center'}}>    
              <TouchableOpacity style={styles.button} onPress={() => {
                this.updateDonations();
                this.props.navigation.navigate('ItemDonateScreen');
              }}>
                <Text style={styles.buttonText}>Donate</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#F8BE85',
      alignItems: 'center',
      justifyContent: 'center'
    },
    displayText:{
      fontSize: 32,
      color:'red',
      fontWeight:'bold',
      textAlign:'center'
    },
    buttonText:{
      color:'#ff5722',
      fontSize:15,
      fontWeight:'bold'
    },
    inputView:{
      flexDirection: 'row',
      marginHorizontal: 50,
      marginTop:25
    },
    inputBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    button:{
      marginVertical:10,
      marginHorizontal:15,
      width:150,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    },
});