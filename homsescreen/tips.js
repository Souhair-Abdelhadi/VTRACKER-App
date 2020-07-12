/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState, Component } from 'react';
import {View,Text,StyleSheet,ScrollView,Image} from 'react-native';



   export default class test extends React.Component{

         
    
        render (){
    
          return (
          
              <View style={styles.container}> 
          
              <ScrollView>  
          


             <View style={styles.views}>
 

        <View style= {[{alignItems : 'center', },styles.assets]} >


            <Text style={{color: '#60aec7',fontSize: 13, }} > Use a mask when going out. </Text> 
            
            <Image source={require('../assets/icons/putMask.jpg')} style={styles.image}  />

        </View>


        <View style= {styles.assets} >

            <Text style={{color: '#60aec7',fontSize: 13, }} > Respect the distance (2 metre)  between you and person near by you.  </Text> 

            <Image source={require('../assets/icons/socialDistancing.jpg')} style={styles.image}  />

        </View>


        <View style= {styles.assets} >

                <Text style={{color: '#60aec7',fontSize: 13, }} > Respect the distance when going shooping , stand in the marker indicated.  </Text> 

                <Image source={require('../assets/icons/shoopingDistance.jpg')} style={styles.image}  />

        </View>
        
        <View style= {styles.assets} >

                <Text style={{color: '#60aec7',fontSize: 13, }} >Use hand sanitiser before you touch anything people usually touch.  </Text> 

                <Image source={require('../assets/icons/alcohol.jpg')} style={styles.image}  />

        </View>

        
        
        </View>
        


          
              </ScrollView>  
          
              </View>
          
          );
          
          }
          
          }
          
          const styles = StyleSheet.create({
          
              container : {
                  marginTop: 0,
                  marginLeft :0,
                  backgroundColor :'white',
                  flex: 1,
          
              },
              row : {
                  flexDirection :'row',
                  marginBottom: 20,
                  
          
              },
          
              views : {
                  marginTop : 10,
                  marginLeft : 0,
              },
             
          
              assets : {
                marginTop: 10,
                marginLeft: 0,
                marginBottom : 6,
                borderWidth : 2,
                borderColor: '#a6ddaf',
    
              },
    
           
              image : {
                  width : '100%',
                  height : 220,
              }
    
    
          });
          
