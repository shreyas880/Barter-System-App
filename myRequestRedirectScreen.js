import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class RequestRedirectScreen extends React.Component{

    constructor(props){
        super();
        this.state = {
            requestEmail:'',
            itemName:'',
            requestId:'',
            reason:'',
            docId:'',
            status:'',
            requestId:Math.random().toString(36).substring(7)
        }
    }

    getRequestDetails(item){
        db.collection('RequestedItems').where('ItemName', '==', item).where('userId', '==', firebase.auth().currentUser.email).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var data = doc.data();
                
                console.log(data);
                console.log(data.userId);
                console.log(data.ItemName);
                console.log(data.requestId);
                console.log(data.reason);

                this.setState({
                    requestEmail:data.userId,
                    itemName:data.ItemName,
                    requestId:data.requestId,
                    reason:data.reason,
                    status:data.status,
                    docId:doc.id
                })
            
                
            })
        })
    } 
    
    markItemReceived(){
        console.log(this.state.docId)

        db.collection('RequestedItems').doc(this.state.docId).update({
            'status':'Item received'
        })

        
        db.collection('Donations').where('ItemReceiver', '==', firebase.auth().currentUser.email).where('ItemName','==', this.state.itemName).where('ItemStatus', '==', 'Received Notification').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var itemDonor = doc.data().ItemDonor
                
                console.log(doc.data());
                console.log(itemDonor);

                db.collection('User').where('emailId', '==', itemDonor).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        console.log(doc.data())
                        this.setState({
                            userId:doc.data().emailId
                        })
                    })
                })
                
                db.collection('AllNotifications').add({
                    'senderEmail':itemDonor,
                    'donorId':this.state.userId,
                    'date':firebase.firestore.Timestamp.now().toDate(),
                    'status':'unread',
                    'Message':this.state.requestEmail + ' has received the Item',
                    'targetEmail':this.state.requestEmail,
                    'requestId':this.state.requestId,
                    'ItemName':this.state.itemName
                })
            })
        })
    
    
    }

    componentDidMount(){
        this.getRequestDetails(this.props.navigation.getParam('details'));
        console.log(this.props.navigation.getParam('details'));
    }

    render(){
        if(this.state.requestId === ''){
            return(
                <Text style={{fontSize:32,fontWeight:'bold'}}>Loading...</Text>
            );
        }else{
            return(
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Requester Email (You): {this.state.requestEmail}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>reason: {this.state.reason}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Item name: {this.state.itemName}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Request Id: {this.state.requestId}</Text>

                    <TouchableOpacity style={[styles.button,{marginTop:150}]} onPress={() => {
                
                        this.markItemReceived();

                    }}>
                        <Text style={{color:'#ffff',fontWeight:'bold',fontSize:16}}>Mark as Received</Text>
                    </TouchableOpacity>
                </View>
            );
        }
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