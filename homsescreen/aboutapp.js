/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,StyleSheet,ScrollView,Image}  from 'react-native';



export default function AboutApp(){

    return (

        <View style={styles.container}>
        <ScrollView>

        <View  style={styles.image} >
                <Image source={require('../assets/icons/VT_logo2.png')  } />
        </View>
            


        <View style={{marginTop: 20,marginRight:10}}>
        <Text style={styles.title} > What does VTRACKER do ? </Text>
        <Text style={styles.text} ><Text style={{color:'#049BB3', }}>VTRACKER</Text> is a new app that give the user the ability to caught other people's device id</Text>
        <Text style={styles.text} > so that we keep track with them whenever something happen to them or you <Text style={{color:'red', }}> (health situation) </Text> </Text>
        <Text style={styles.text} >and than inform you with the update all the way and always.</Text>
        </View>

        <View style={{marginRight:10}}>
        <Text style={styles.title} > Why use VTRACKER  ? </Text>
        <Text style={styles.text} > <Text style={{color:'#049BB3', }}>VTRACKER</Text> help you to take control in such epidemic by storing data of people who you cross by  </Text>
        <Text style={styles.text} > that's help us to identify who you've been cross with and contact them in case you got  the virus </Text>
        <Text style={styles.text} > so that we can minimize the risk of the virus being spread and get out of contol. </Text>
        <Text style={styles.note} >  Note that : </Text>
        <Text style={styles.text} > the data being stored is secured and no one can access it , only administrators have the permassion for that matter. </Text>

        </View>        

        <View  style={{marginRight:10}}>
            <Text style={styles.title}  > Innovited by : </Text>
            <Text style={styles.person} > Abdelhadi Souhair : Software developer  </Text>
            <Text style={styles.person} > Youssef Lahlou    :  Software developer  </Text>

        </View>
        </ScrollView>
        </View>


    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor :'white',
        flex: 1,
    },
    title : {
        color: '#049BB3',
        fontSize: 17,
        fontWeight : "bold",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    text : {
        fontSize : 14,
        fontWeight: "bold",
        paddingLeft :20,
        paddingBottom:5,
        paddingTop : 3,


        
    },
    note : {
        fontSize : 16,
        fontWeight: "bold",
        color :'red',
        paddingLeft :30,
        paddingBottom:5,
        paddingTop : 3,
    },
    person : {
        fontSize : 15,
        fontWeight: "bold",
        paddingLeft :30,
        paddingBottom:5,
        paddingTop : 3,
    },
    image : {
        marginTop : 0,
        alignItems:'center',
        marginLeft: 30,

    },

})