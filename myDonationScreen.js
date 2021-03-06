import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyDonationScreen extends React.Component{

    constructor(){
        super();
        this.state = {
          userId:'',
          title:'',
          allDonationNames:[],
          allDonations:[]
        }
    }

    async componentDidMount(){

      await db.collection('User').where('emailId','==',firebase.auth().currentUser.email).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userId:doc.id
          })
        })
      })


      db.collection('Donations').where('ItemDonor', '==', firebase.auth().currentUser.email).get().then((snapshot) => {
        
        snapshot.docs.map((doc) => {
          
          var allDonation = doc.data();
          var allDonationNames = allDonation.ItemName
          
          if(this.state.allDonationNames.includes(allDonationNames) === false){
            this.setState({
              allDonationNames:[...this.state.allDonationNames,allDonationNames],
              allDonations:[...this.state.allDonations,allDonation]
            })
          }
        });
      })

    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item, i}) => {
      return(
        <ListItem
          key={i}
          title={item}
          subtitle={item.userId}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button} onPress={() => {
                
                this.props.navigation.navigate('DonationDetails',{details:item});

              }}>
                <Text style={{color:'#ffff'}}>View</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
    }
    

    render(){
        return(
            <View>
              <MyHeader title='My Donations' navigation ={this.props.navigation}/>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.allDonationNames}
                  renderItem={this.renderItem}
                />
            </View>
        )
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