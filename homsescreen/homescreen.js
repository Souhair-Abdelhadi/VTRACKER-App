/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import {createAppContainer} from 'react-navigation';
import  {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import {Image} from 'react-native';
import HomeScreen from './homepage';
import AboutStack from './aboutstack';
import SettingsStack from './SettingsStack';
import Tips from './tipsStack';


const Root = createDrawerNavigator({

    Home : {
        screen : HomeScreen,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/icons/home.png')} 
                 />
            ),
        },
    },
    Tips : {
        screen : Tips,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/icons/tips.png')} 
                 />
            ),
        },
    },
    About : {
        screen : AboutStack,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/icons/about.png')} 
                 />
            ),
        },
          
    },
    Settings : {
        screen : SettingsStack,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/icons/settings.png')} 
                 />
            ),
        },
    },
    
});

export default createAppContainer(Root);

