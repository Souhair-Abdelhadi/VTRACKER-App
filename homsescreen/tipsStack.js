/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import tips from './tips';
import Header from './tipsHeader';




const screens = {
    Tips : {
        screen : tips ,
        navigationOptions: ({ navigation }) => {
            
            return {
                headerTitle : () => <Header navigation={navigation}  />,
                
            };
        },
},
};
const TipsStack = createStackNavigator(screens,{defaultNavigationOptions:{
                headerStyle: {backgroundColor: '#60aec7', height:50,
            },
            headerTintColor: 'white',
}});

export default TipsStack;