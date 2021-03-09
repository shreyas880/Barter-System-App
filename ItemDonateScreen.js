import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class ItemDonateScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      requestedItemsList : [],
      email:[]
    }
  }

  async getRequestedItemsList(){

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

    db.collection('RequestedItems').where('userId', 'in', this.state.email).get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        this.setState({
          requestedItemsList:[...this.state.requestedItemsList,doc.data()]
        })

        console.log(doc.data());
        console.log(this.state.requestedItemsList);

      })
    })
  }

  componentDidMount(){
    this.getRequestedItemsList()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item, i}) => {
    return(
      <ListItem
        key={i}
        title={item.ItemName}
        subtitle={item.reason}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button} onPress={() => {
              
              console.log(item);
              
              this.props.navigation.navigate('ReceiverDetails',{'details':item});
            }}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    );
  }

  render(){
    return(
      <View style={{flex:6}}>
        <MyHeader title="Donate Items" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>Loading...</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
