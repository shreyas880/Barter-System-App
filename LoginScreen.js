import React,{Component}from 'react';
import {View,Text,TextInput,Modal,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      signUpPressed:false,
      hidePassword:true,
      emailId:'',
      address:'',
      lastName:'',
      firstName:'',
      confirmPassword:'',
      contact:'',
      PasswordType:'Show'
    }
  }

  render(){
    if(this.state.signUpPressed === true){
      return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          style={{alignSelf:'auto',width:'50%'}}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                value={this.firstName}
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                value={this.state.lastName}
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                value={this.state.contact}
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType='number-pad'
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                value={this.state.address}
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                value={this.state.emailId}
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                value={this.state.password}
                style={styles.formTextInput}
                value={this.state.password}
                placeholder ={"Password"}
                secureTextEntry = {this.state.hidePassword}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                value={this.state.confirmPassword}
                style={styles.formTextInput}
                value={this.state.confirmPassword}
                placeholder ={"Confirm Password"}
                secureTextEntry = {this.state.hidePassword}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
                />
              <TouchableOpacity onPress={() => {
                if(this.state.hidePassword === true){
                  this.setState({
                    hidePassword:false,
                    PasswordType:'Hide'
                  })
                }else{
                  this.setState({
                    hidePassword:true,
                    PasswordType:'Show'
                  }) 
                }
              }}
              style={styles.button}>
                <Text style={styles.buttonText}>{this.state.PasswordType} Password</Text>
              </TouchableOpacity>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.modalBackButton,{marginBottom:25}]}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.setState({
                      signUpPressed:false
                    })
                  }}
                >
                <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
    }else{
      return(
        <View>
          <TextInput style={styles.loginBox}
          placeholderTextColor='grey'
          placeholder='Username'
          onChangeText={(text) => {
            this.setState({
              username:text
            });
          }}
          value={this.state.username}/>

          <TextInput style={styles.loginBox}
          value={this.state.password}
          placeholderTextColor='grey'
          secureTextEntry={this.state.hidePassword}
          placeholder='Password'
          onChangeText={(text) => {
            this.setState({
              password:text
            });
          }}
          value={this.state.password}/>

          <TouchableOpacity style={styles.button}
            onPress={() => {
              if(this.state.hidePassword === true){
                this.setState({
                  hidePassword:false,
                  PasswordType:'Hide'
                })
              }else{
                this.setState({
                  hidePassword:true,
                  PasswordType:'Show'
                })
              }
            }}
          >
            <Text style={styles.buttonText}>{this.state.PasswordType} Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          onPress={async ()=>{
              if(this.state.password !== undefined && this.state.username !== undefined){                           
                  try{
                      const response = await firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password);
                      if(response !== undefined){
                        // this.switchScreen();
                        alert('Succcesful Login');
                      }
                  }catch(error){

                    if(error.code === 'auth/user-not-found'){
                      alert('user does not exist');
                    }else if(error.code === 'auth/wrong-password'){
                      alert('Incorrect password');
                    }else if(error.code === 'auth/invalid-email'){
                      alert('Invalid email');
                    }
                      console.log(error);
                      console.log(error.code);
                  }
              }else{
                  alert('Please enter username and password')
              }
              // alert('it is working till here');
          }}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}
          onPress={() => {
            this.setState({
              signUpPressed:true,
              hidePassword:true,
              PasswordType:'Show'
            })
          }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
  }
}


const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderWidth: 2.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
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
   padding: 10,
   marginTop:25
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'bold',
   fontSize:20,
 }
});