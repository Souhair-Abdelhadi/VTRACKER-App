/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function BluetoothListLayout(props) {

    return(

        <View style={styles.container}>
            <Text style={styles.title}> {props.title} </Text>
             {props.children}
        </View>
    )

   

}

const styles = StyleSheet.create({
    container: {
    marginTop: 9,
    marginLeft:3,
    marginVertical:6,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',

    }

})

export default BluetoothListLayout;