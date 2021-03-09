import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import SwipeableNotifications from '../components/SwipeableNotifications';

export default class NotificationScreen extends React.Component{
    
    constructor(){
        super();
        this.state = {
            allNotifications:[],
            email:[]
        }
    }

    async updateNotifications(docId){

      var id;

      db.collection('AllNotifications').doc(docId).update({
        'status':'read'
      })

      db.collection('AllNotifications').doc(docId).get().then((doc) => {
        var data = doc.data();

        id = data.requestId;
        //alert(id)
      })

       db.collection('Donations').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {

          if(doc.data().requestId === id){
            db.collection('Donations').doc(doc.id).get().then((doc) => {
              console.log(doc.data());
              console.log(doc.id);

              db.collection('Donations').doc(doc.id).update({
                'ItemStatus':'Received Notification'
              })

            })
          }
        })
       })
    }

    async getnotifications(){

      await db.collection('User').get().then((snapshot) => {

        snapshot.docs.map((doc) => {
          
          var data = doc.data();


          if(data.emailId !== firebase.auth().currentUser.email){
            if(this.state.email.includes(data.emailId) === false){
              this.setState({
                email:[...this.state.email,data.emailId]
              })
            }
          }
        })
      })


      
      db.collection('AllNotifications').where('targetEmail', '==', firebase.auth().currentUser.email).where('status', '==', 'unread').where('senderEmail', 'in', this.state.email).get().then((snapshot) => {

            var allNotifications = [];
            
            snapshot.forEach((doc) => {
                
                var data = doc.data()
                
                data['docId'] = doc.id

                allNotifications.push(data);
            })
          
            this.setState({
                allNotifications:allNotifications,
            })
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item, i}) => {
      return(
        // <ListItem
        //   key={i}
        //   title={item.Message}
        //   titleStyle={{ color: 'black', fontWeight: 'bold' }}
        //   rightElement={
        //       <TouchableOpacity style={styles.button} onPress={() => {

        //         // console.log(item)

        //         this.updateNotifications(item.docId,item.ItemName,item.receiverEmail);
        //       }}>
        //         <Text style={{color:'#ffff'}}>Mark as Read</Text>
        //       </TouchableOpacity>
        //     }
        //   bottomDivider
        // />

        <SwipeableNotifications allNotifications={this.state.allNotifications}/>

      )
    }
    
    // componentDidMount(){
    //   this.getnotifications();
    // }


    render(){
        this.getnotifications();
        return(
            <View>
                <MyHeader title='Notification Screen' navigation={this.props.navigation}/>
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                />
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