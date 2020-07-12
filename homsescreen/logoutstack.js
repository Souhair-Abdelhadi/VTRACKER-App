/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Logout from '../compenent/logout';

    const screen = {

        Logout : {
            screen : Logout ,
            
        },

    };

    const LogOutStack = createStackNavigator(screen,{
        defaultNavigationOptions :{
            headerStyle : {backgroundColor:'#60aec7',height:0 },
            headerTintColor:'white',
        },
        
    });





export default LogOutStack;
