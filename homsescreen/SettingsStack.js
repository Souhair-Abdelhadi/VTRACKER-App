/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from './SettingsHeader';
import Settings from '../compenent/settings';




const screens = {
    Setting1 : {
        screen : Settings,
        navigationOptions: ({ navigation }) => {
            
            return {
                headerTitle : () => <Header navigation={navigation}  />,
                
            };
        },
},
};
const SettingsStack = createStackNavigator(screens,{defaultNavigationOptions:{
                headerStyle: {backgroundColor: '#60aec7', height:50
            },
            headerTintColor: 'white',
}});

export default SettingsStack;