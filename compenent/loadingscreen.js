/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet ,ActivityIndicator,Alert} from 'react-native';
import firebase from 'react-native-firebase';

export default class LoadingScreen extends React.Component{

    componentDidMount(){

         firebase.auth().onAuthStateChanged(user => {
            var verified;

            if (user) {

                var userLoggedIn = firebase.auth().currentUser;
                verified = userLoggedIn.emailVerified;
                
                        if (verified === true){
                            this.props.navigation.navigate("App");
                        }
                        else {
                            this.props.navigation.navigate("Auth");
                            
                            
                        }
            }

            else {
                this.props.navigation.navigate("Auth");
            }

         });
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}> Loading ... </Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }


}

const styles = StyleSheet.create({

    container : {
        flex : 1,
        justifyContent: "center",
        alignItems: 'center',

    },
    text: {
        fontSize:26,
        fontWeight: "bold",
        padding : 80,
    }
})