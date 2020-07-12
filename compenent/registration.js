/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {Text,View,TouchableWithoutFeedback,Keyboard,
    TextInput,StyleSheet,ScrollView,Image, Button,TouchableOpacity,Modal} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'react-native-firebase';

export default class Register extends React.Component{

    state = {
        fullname: '',
        email: '',
        password: '',
        errorMessage: '',
        modal : false,

    }

    list = [{
        date : 'null',
        mac : 'null',
        etat : 'null',
    }]



      ShowCurrentDate = ()=>{
 
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
       
        if (day < 10 && month < 10){
        var date = '0' + day + '/0' + month + '/' + year; 
        return date;
        }

        else if (day < 10 ){
        var date = '0' + day + '/' + month + '/' + year; 
        return date;
        }

        else if ( month < 10){
        var date =  day + '/0' + month + '/' + year; 
        return date;
        }
       };

       handleModal = () =>{

        this.setState({ modal : false  });

       }


    handleRegistration = () => {
        var userId ;
        var childId ;
        
        if (this.state.password.length === 0 || this.state.email.length === 0 || this.state.fullname.length === 0 ){
            this.setState({ errorMessage : 'please complete the registration data' });
        }

        else {
         firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(userCredetials => {
             userCredetials.user.updateProfile({
                displayName: this.state.fullname,
                 });
                 
            userId =  userCredetials.user.uid;
            childId = firebase.database()
           .ref('/users/' + userId)
           .update({
            createdDate : this.ShowCurrentDate(),
            condition : 'green',
            diagnosticDate : 'null',
            firstLogin : "true",
            list : this.list,
        });

        userCredetials.user.sendEmailVerification();
        console.log('email verification sent to ' + userCredetials.user.email );

        var created = true;


          if (created){
        this.setState({ modal : true });
        var sql = require('react-native-sqlite-storage');
        var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (1)'),
        (error) => console.log(error)    );



        db.transaction((tx)=>{

        tx.executeSql('UPDATE usertablecondition1 SET firebaseid=? WHERE id=1',[userId],(tx,results)=>{

            console.log('table usertablecondition1 initiallized with firebaseid');


        });

        


}
);
    }



        } 
        )
        .catch(error =>  this.setState({errorMessage : error.message})
            );
        }
    }


     signin() {
        Actions.signin();
    }

render()

    { 
       return (


           
        <TouchableWithoutFeedback onPress={() => {
            console.log('you just get out from the input');
            Keyboard.dismiss();
        }
        
        } >


        <View style={styles.container}>

        <Modal visible={this.state.modal} >

        <View style={styles.modalContainer} >

            <TouchableOpacity onPress={this.handleModal} >

                <Image  source={require('../assets/icons/close32.png')} style={styles.close}  />

            </TouchableOpacity>
            <Image  source={require('../assets/icons/VT_logo2.png')} style={styles.logo}  />

            <Text style={styles.modalText} >You are Registered successfully in VTRACKER App </Text>
            <Text style={styles.modalText} >we sent a verification link to your email : <Text style={{color:'#a6ddaf' }} > {this.state.email} </Text>  </Text>
            <Text style={styles.modalText} >Thanks for using our App. </Text>

            <Text style={styles.noteText} > note that : </Text>
            <Text style={styles.modalText} > you won't be able to login if your account isn't verified.</Text>

        </View>


        </Modal>

        <ScrollView>

        <View  style={styles.image} >
            <Image source={require('../assets/icons/VT_logo2.png') } />
        </View>

        <Text style={styles.error} > {this.state.errorMessage} </Text> 

        <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your fullname' placeholderTextColor='white' 
                            style={styles.input}
                            onChangeText={fullname => this.setState({ fullname })}
                            value={this.state.fullname}
                              /> 
            </View>

            

            <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your email' placeholderTextColor='white' 
                            style={styles.input} 
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                             /> 
            </View>

            <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your password' placeholderTextColor='white' 
                            style={styles.input} secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            autoCapitalize= "none" 
                             /> 
            </View>

            <View style={styles.button} >
                <Button title='Register' 
                color='#a6ddaf' 
                onPress={this.handleRegistration}
                />

            </View>

            
            <View style={styles.note} >
                    

                    <Text style={{fontSize:16,fontWeight:"bold",color: 'white'}} > Already  have an account ?  </Text>

                        <TouchableOpacity  onPress={this.signin}>
                                <Text style={styles.signIn}>Sign In</Text>
                        </TouchableOpacity>


                </View>

            </ScrollView>
        </View>
        
        </TouchableWithoutFeedback>
    );


}
}
const styles = StyleSheet.create({

    container : {
        flex:1,
        backgroundColor: '#607aec',
        marginTop:0,
      
    },
    image : {
        marginTop : 30,
        paddingBottom: 0,
        alignItems:'center',
        marginLeft: 15,
    },
    inputboxs : {
        paddingTop: 4,
        paddingBottom:15,
    },
    input : {
        borderWidth:1,
        borderColor : '#a6ddaf',
        width: '90%',
        height: 40,
        marginLeft: 20,
        paddingLeft:15,
    },
    button :{
        width:'70%',
        alignContent: 'center',
        marginLeft:60,
        marginTop:10,
        marginBottom:20,
    },
    error:{
        color: 'white',
        fontSize: 16,
        fontWeight : 'bold',
        marginLeft: 30,
  
    },
    note : {
        marginLeft:10,
        marginTop:30,
        marginBottom:20,
        flexDirection : "row",
    },
    signIn: {
            fontSize : 16,
            fontWeight: "bold",
            color : '#a6ddaf',
    },
    modalContainer : {
        flex :1,
        backgroundColor : '#607aec',
  
    },
    modalText : {
        fontSize : 16,
        fontWeight: "bold",
        color : 'white',
        paddingTop : 10,
        paddingBottom :5,
        marginRight:10,
        marginLeft:20,
  
  
    },
    close : {
        marginLeft : '90%',
        marginTop: '2%',
  
    },
    noteText : {
        fontSize : 18,
        fontWeight: "bold", 
        color : 'red',
        paddingTop : 15,
        paddingBottom :5,
        marginRight:20,
        marginLeft:20,
    },
    logo : {
      marginLeft:40,
    }
   
  });