/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AboutApp from "./aboutapp";
import Header from './aboutheader';




const screens = {
    About : {
        screen : AboutApp,
        navigationOptions: ({ navigation }) => {
            
            return {
                headerTitle : () => <Header navigation={navigation}  />,
                
            };
        },
},
};
const AboutStack = createStackNavigator(screens,{defaultNavigationOptions:{
                headerStyle: {backgroundColor: '#60aec7', height:50,

            },
            headerTintColor: 'white',
}});

export default AboutStack;
