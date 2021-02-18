import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, ScrollView,KeyboardAvoidingView } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { render } from 'react-dom';
import { TextInput } from 'react-native-gesture-handler';
import { DrawerActions } from 'react-navigation-drawer';

export default class SettingScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            firstName:'',
            lastName:'',
            emailId:'',
            contactNo:'',
            address:'',
            docId:''
        }
    }

    updateUserDetails(){
        db.collection('User').doc(this.state.docId).update({
            'Address':this.state.address,
            'ContactNo':this.state.contactNo,
            'FirstName':this.state.firstName,
            'LastName':this.state.lastName,
            'emailId':this.state.emailId
        })

        console.log(this.state.address)
    }

    getUserDetails(){
        var user = firebase.auth().currentUser;
        var email = user.email;
        console.log(email)

        db.collection('User').where('emailId', '==', email).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var data = doc.data();
                console.log(doc.id);

                this.setState({
                    address: data.Address,
                    contactNo: data.ContactNo,
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    emailId: data.emailId,
                    docId:doc.id
                })

                console.log(data.Address)
            })
        })


    }

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <MyHeader title="Settings" navigation ={this.props.navigation}/>
                        <View style={styles.subContainer}>
                        <TextInput placeholder='firstName'
                            style={[styles.formTextInput,{height:50}]}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName:text
                                })
                            }}
                            value={this.state.firstName}/>
                            <TextInput placeholder='Last Name'
                            style={[styles.formTextInput,{height:50}]}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName:text
                                })
                            }}value={this.state.lastName}/>
                            <TextInput placeholder='email Id'
                            keyboardType='email-address'
                            style={[styles.formTextInput,{height:50}]}
                            onChangeText={(text) => {
                                this.setState({
                                    emailId:text
                                })
                            }}
                            value={this.state.emailId}/>
                            <TextInput placeholder='password'
                            style={[styles.formTextInput,{height:50}]}
                            onChangeText={(text) => {
                                this.setState({
                                    password:text
                                })
                            }}
                            value={this.state.password}/>
                            <TextInput placeholder='Contact'
                            keyboardType='number-pad'
                            style={[styles.formTextInput,{height:50}]}
                            onChangeText={(text) => {
                                this.setState({
                                    contactNo:text
                                })
                            }}
                            value={this.state.contactNo}/>
                            <TextInput placeholder='Address'
                            multiline={true}
                            style={[styles.formTextInput,{height:150}]}
                            onChangeText={(text) => {
                                this.setState({
                                    address:text
                                })
                            }}
                            value={this.state.address}/>

                            <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.updateUserDetails();
                            }}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
        margin:15,
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
        padding: 10
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    buttonText:{
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight:"bold",
        color: 'white'
    },
  })
  