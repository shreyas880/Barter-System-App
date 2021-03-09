import React from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class RedirectScreen extends React.Component{

    constructor(props){
        super();
        this.state = {
            donorEmail:'',
            itemName:'',
            itemStatus:'',
            receiverEmail:'',
            requestId:''
        }
    }

    getDonationDetails(item){
        db.collection('Donations').where('ItemName', '==', item).where('ItemDonor', '==', firebase.auth().currentUser.email).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var data = doc.data();
                
                console.log(data);
                console.log(data.ItemDonor);
                console.log(data.ItemName);
                console.log(data.ItemStatus);
                console.log(data.ItemReceiver);
                console.log(data.requestId);

                this.setState({
                    donorEmail:data.ItemDonor,
                    itemName:data.ItemName,
                    itemStatus:data.ItemStatus,
                    receiverEmail:data.ItemReceiver,
                    requestId:data.requestId,

                })
            })
        })
    }    

    componentDidMount(){
        this.getDonationDetails(this.props.navigation.getParam('details'));
    }

    render(){
        if(this.state.requestId === ''){
            return(
                <Text style={{fontSize:32,fontWeight:'bold'}}>Loading...</Text>
            );
        }else{
            return(
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Donor Email (You): {this.state.donorEmail}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Item Name: {this.state.itemName}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Item Status: {this.state.itemStatus}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Item Receiver Email: {this.state.receiverEmail}</Text>
                    <Text style={{fontSize:32,fontWeight:'bold',marginVertical:12.5}}>Request Id: {this.state.requestId}</Text>
                </View>
            );
        }
    }
}