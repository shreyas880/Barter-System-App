import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends React.Component{
    
    constructor(){
        super();
        this.state = {
            allNotifications:[],
        }
    }

    getnotifications(){
        db.collection('AllNotifications').where('receiverEmail', '==', firebase.auth().currentUser.email).where('status', '==', 'unread').get().then((snapshot) => {

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
        <ListItem
          key={i}
          title={item.Message}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button} onPress={() => {
                
                 (item);
                 (i);

                db.collection('AllNotifications').doc(item.docId).update({
                    'status':'read'
                })

              }}>
                <Text style={{color:'#ffff'}}>Mark as Read</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
    }
    
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