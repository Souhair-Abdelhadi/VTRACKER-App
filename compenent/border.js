/* eslint-disable prettier/prettier */
import React from 'react';

import {View,StyleSheet,} from 'react-native';


function Border(){

    return(

        <View>
            <View style={styles.border} />

        </View>
    )
}

const styles= StyleSheet.create({

    border: {
        borderBottomWidth: 1,
        marginLeft:3,
        flex: 1,
        marginTop: 0,
        borderColor: '#bac8b6',
    }

})

export default Border;
