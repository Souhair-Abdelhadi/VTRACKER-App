/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,
    TouchableWithoutFeedback ,Image, Keyboard,ScrollView ,Button ,Alert,Linking,Modal} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

import  * as firebase from 'react-native-firebase';

import {Actions} from 'react-native-router-flux';



    export default class LoginScreen extends React.Component {

        state = {
            email : "",
            password : "",
            errorMessage : "",
            modal : false ,
            resetPassword :"",
            resetPasswordError : "",
            createLocalDB : true,

        }
        Redirect(){
            Actions.home();
        }


         handleLinking = ()=>{

            Linking.openURL("http://vtracker.hopto.org");
      
          }
      

          forgotPassword = () =>{

            if (this.state.resetPassword.length === 0 ){
                this.setState({
                    resetPasswordError : 'please insert your data in the input ',
                });
            }

            else {

            firebase.auth().sendPasswordResetEmail(this.state.resetPassword)
            .then(user =>{


                this.setState({resetPasswordError : 'password reset successfully, check your e-mail'});

            } )
            .catch(error => this.setState({ resetPasswordError : error.message }) );

            }

          }

          handleModal = () =>{

            this.setState({ modal : false  });
            this.setState({ resetPasswordError: '' });
    
           }
    
           openModal = () => {

            this.setState({ modal : true });
            this.setState({ resetPasswordError: '' });

           }


        handleLogin = () => {

            if (this.state.password.length === 0 || this.state.email.length === 0 ){
                this.setState({
                    errorMessage : 'please insert your data in the input ',
                });
            }
            
            else {
            const {email,password} = this.state;
            var user;
            var firstLogin;
            firebase.auth().signInWithEmailAndPassword(email,password)
           .then( snpashot => {

            user = firebase.auth().currentUser;
            var sql = require('react-native-sqlite-storage');
            var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
            (error) => console.log(error)    );  
            db.transaction((tx) => {
              tx.executeSql('UPDATE usertablecondition1 set firebaseid=? where id=1 ;',[snpashot.user.uid],(tx,results)=>{
                  console.log('usertablecondition1 updated;');
                  
                  
              });
          });
            if (user && user.emailVerified == true ){
               console.log( user.email + ' : '+ user.displayName + ' : '+ user.emailVerified + ' :user logged in ');
                       
             firebase.database().ref('/users/' + user.uid + '/')
             .child('firstLogin')
             .once('value',function(snap){

                firstLogin = snap.val();
                if (firstLogin == "true" ){

                firebase.database().ref('/users/' + user.uid + '/')  
                .update({ firstLogin : "false"});

                }
                else {

              
                    var uid = firebase.auth().currentUser.uid;
              
                    db.transaction((tx)=>{
              
                      tx.executeSql('SELECT count(*) as usersnombre FROM persons1;',[],(tx,res)=>{
              
                        var len = res.rows.item(0).usersnombre;
              
                        if ( len == 0 ){
              
                         
                           if (firstLogin == "false"){
                            
                            firebase.database().ref('/users/' + uid + '/')
                            .child('list')
                            .once('value',function(snapshot){
              
              
                                var list = snapshot.val();
              
                                list.map(elem=>{
              
                                  if (elem){
              
                                    db.transaction((tx)=>{
              
                                      tx.executeSql('INSERT INTO persons1 VALUES (?,?,?);',[elem.mac,elem.ref,elem.date],(tx,result)=>{
                                        console.log('data loaded from firebase');
                                    });
              
              
              
                                    });
              
                                  }
              
              
                                });
              
              
                            })
                            .catch(error => { console.log(error.message);});
                            
                                                            
                           }
              
              
                        
                          
              
              
                        }
              
              
              
                      });
              
                    });
              
              
                    


                }

             });

             
              Alert.alert('Attention',
              'please enable or re-enable bluetooth manually so that the app will work properly',
              [{text :'UNDERSTOOD', onPress : () => console.log('user pressed understood')}]);

              BluetoothSerial.enable();

             
            
            }

            else if (user && user.emailVerified == false) {
                this.setState({ errorMessage : '' });
                firebase.auth().signOut();
                Alert.alert('Attention',
                 'Your account is not yet verified , please go check your email and verify your account to use it  ',
                 [{text :'UNDERSTOOD', onPress : () => console.log('user pressed understood for verified account case')}]);
                console.log('user signed out from login screen');

                  }
           })
            .catch(error => {
                this.setState({errorMessage : error.message});
                console.log('failleur to log in');
                
                
                }
                );
            }
        }


    

 
        signup(){
            Actions.registartion();
        }

        render()
        {

            if ( this.state.createLocalDB == true  ) {  

                var sql = require('react-native-sqlite-storage');
                var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
                (error) => console.log(error)    );  
                
                db.transaction((tx)=>{

                     tx.executeSql('insert into usertablecondition1 values (?,?,?);',[1,'green','null'],(tx,res)=>{

                         console.log('usertablecondition1 updated');
                         this.setState({ createLocalDB : false });

                     });

                    // tx.executeSql('select * from test;',[],(tx,res)=>{
                    //     console.log(res.rows.raw());
                    // })

                });
              
              
              
              
              }
              else {

                console.log('db created');

              }





            return (
            <TouchableWithoutFeedback  onPress={() => {
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

                    <Text style={styles.error} > {this.state.resetPasswordError}  </Text>

                <View style={styles.inputboxs}>
                    <TextInput placeholder='Enter your email' placeholderTextColor='white' 
                                style={styles.input} onChangeText={resetPassword => this.setState({ resetPassword })}
                                value={this.state.resetPassword}
                                 /> 
                </View>

                <View style={styles.button}>
                    <Button title='reset password' 
                    color='#a6ddaf' 
                    onPress={this.forgotPassword}
                       
                    />
                </View>

                </View>


            </Modal>


            <ScrollView>

            <View  style={styles.image} >
                <Image source={require('../assets/icons/VT_logo2.png')  } />
            </View>
            
           
                 <Text style={styles.error} > {this.state.errorMessage} </Text> 
            
            
            
    
                <View style={styles.inputboxs}>
                    <TextInput placeholder='Enter your email' placeholderTextColor='white' 
                                style={styles.input} onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                 /> 
                </View>
    
                <View style={styles.inputboxs}>
                    <TextInput placeholder='Enter your password' placeholderTextColor='white' 
                                style={styles.input} 
                                secureTextEntry={true} onChangeText={password => this.setState({ password }) }
                                value={this.state.password}
                                autoCapitalize="none"
                                 /> 
                </View>
    
                <View style={styles.button}>
                    <Button title='Login' 
                    color='#a6ddaf' 
                    onPress={this.handleLogin}
                       
                    />
                </View>


                <View style={styles.note} >
                    

                    <Text style={{fontSize:16,fontWeight:"bold",color: 'white'}} > forgot your password ?  </Text>

                        <TouchableOpacity  onPress={this.openModal}>
                                <Text style={styles.signUp}>Reset Password</Text>
                        </TouchableOpacity>


                </View>


                <View style={styles.note} >
                    

                    <Text style={{fontSize:16,fontWeight:"bold",color: 'white'}} > you don't have an account ?  </Text>

                        <TouchableOpacity  onPress={this.signup}>
                                <Text style={styles.signUp}>Sign up</Text>
                        </TouchableOpacity>


                </View>


                
                <TouchableOpacity onPress={this.handleLinking} > 
                    <Text style={styles.Redirect}  >click here to visit VTRACKER website for more information </Text>
                </TouchableOpacity>



                </ScrollView>
            </View>
            
            </TouchableWithoutFeedback>
            
        )
    
    
    }


}
  

const styles = StyleSheet.create({
    
    container : {
        flex:1,
        backgroundColor: '#607aec',
        marginTop: 0,
    },
    image : {
        marginTop : 30,
        paddingBottom: 0,
        alignItems:'center',
        marginLeft: 15,

    },
    inputboxs : {
        paddingTop: 10,
        paddingBottom:26,
    },
    input : {
        borderWidth:1,
        borderColor : '#a6ddaf',
        width: '90%',
        height: 40,
        marginLeft: 20,
        paddingLeft:15,
    },
    button: {
        width:'60%',
        alignContent: 'center',
        marginLeft:80,
        marginTop:10,
        marginBottom:10,
    },
    error:{
        color: 'white',
        fontSize: 16,
        fontWeight : 'bold',
        marginLeft: 30,

    },
    note : {
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        flexDirection : "row",
    },
    signUp: {
            fontSize : 16,
            fontWeight: "bold",
            color : '#a6ddaf',
    },
    Redirect : {
      fontSize : 15,
      fontWeight: "bold",
      color : 'yellow',
      marginRight:10,
      marginLeft:10,


  },
    modalContainer : {
        flex :1,
        backgroundColor : '#607aec',
    },
    close : {
        marginLeft : '90%',
        marginTop: '2%',
  
    },
    logo : {
      marginLeft:40,
    },
   
});

    