/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';

import * as firebase from 'react-native-firebase';
import BluetoothSerial from 'react-native-bluetooth-serial-next';



export default class Logout extends React.Component {

state = {
    email : "",
    displayName : "",
}


    hanldeLogOut = () => {
        BluetoothSerial.disable();
        firebase.auth().signOut();
        console.log('user log out successfully');
    }


render(){

    return (
        <View>
        <TouchableOpacity onPress={this.hanldeLogOut}  >
            <Text style={styles.logout}>  Log Out  </Text>
        </TouchableOpacity>
        </View>

    )
    
}

}

const styles = StyleSheet.create({

    logout : {
        color: 'red',
        fontSize: 15,


    }

})