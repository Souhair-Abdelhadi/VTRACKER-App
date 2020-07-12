/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView, Button} from 'react-native';
import firebase from 'react-native-firebase';
import BluetoothSerial from 'react-native-bluetooth-serial-next';


export default class StatRefresh extends React.Component {

state = {
 etat : '',
 personNombres : '?',
 color : 'black',
 infectionTotalNombre : '-',
 infectionTotalRecovery : '-',
 deathTotalNombre : '-',
 todayDeath : '-',
 todayInfection : '-',
 todayRecovery : '-',
 mounted : true,
 alertMessage : '',
 alertColor : 'green',
}

hanldeLogOut = () => {
    BluetoothSerial.disable();
    firebase.auth().signOut();
    console.log('user log out successfully');
}



 getStat = () => {
            var sql = require('react-native-sqlite-storage');
            var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
            (error) => console.log(error)    );

    db.transaction((tx) =>{
        tx.executeSql('SELECT count(mac) as nombres FROM persons1 ;',[],(tx,results) => {
            var len = results.rows.length;
            if (len > 0 ){
                this.setState({ personNombres : results.rows.item(0).nombres });
                console.log(this.state.personNombres);
            }
        });
    } );

     db.transaction((tx) => {
         tx.executeSql('SELECT * FROM persons1 ;',[],(tx,results)=>{

             var len = results.rows.length;
             var dataList = results.rows.raw();
             if (len > 0){
                 firebase.database()
                 .ref('/users/' + firebase.auth().currentUser.uid + '/' )
                 .update({list : dataList});
             }

         });
     });

    var getColor;
      firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/')
      .child('condition')
      .once('value')
      .then(snapshot => {
          var updated = false;
        getColor = snapshot.val();
        db.transaction((tx) => {
            tx.executeSql('UPDATE usertablecondition1 set condition=? where id=1 ;',[getColor],(tx,results)=>{
                console.log('usertablecondition1 updated;');
                updated = true;
                if (updated == true) {
                    db.transaction((tx) => {
                  tx.executeSql('SELECT * FROM usertablecondition1;',[],(tx,results) =>{
        
                    var conditionColor = results.rows.item(0).condition;
        
                    this.setState({ color : conditionColor});
                    if (conditionColor == "yellow" ){
                      this.setState({ alertMessage : 'possibly you have the virus, please go to hospital for check.',
                      alertColor : 'orange',
                    });
                    }
                    else if (conditionColor == "red" ){
                      this.setState({ alertMessage : ' you are positive to virus, please go to hospital or contact the authority.',
                      alertColor : 'red',
                    });

                    }
                    else {
                      this.setState({ alertMessage : '',alertColor: 'green' });
                    }
        
        
                  });
              });
                }
                
            });
        });
        
      });

      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM usertablecondition1;',[],(tx,results) =>{

          var conditionColor = results.rows.item(0).condition;

          this.setState({ color : conditionColor });
            

        });
    });
      

};




 
render (){
    
   if (this.state.mounted === true ){

     firebase.database().ref('/users/statistics/')
     .once('value',(snap)=>{

      this.setState({
        infectionTotalNombre : snap.val().cases ,
        infectionTotalRecovery : snap.val().recovered ,
        deathTotalNombre : snap.val().deaths ,
        todayDeath : snap.val().newDeaths ,
        todayInfection : snap.val().newCases ,
        todayRecovery : snap.val().newRecovered ,
        mounted : false,
      });

     });

     
   }

    return (
    
        <View style={styles.container}> 
    
        <ScrollView>  
    


        <View style={[{display: this.props.displayActive },styles.views]}>
    
        <View style={[{alignItems : 'center',},styles.header]} >

          <Text style={{color: '#60aec7',fontSize: 18,fontWeight:'bold',}} > Here to maintain your safety </Text> 

      </View>


          <View style={styles.assets} >
            <Image source={require('../assets/icons/communication.jpg')} style={styles.communication} />
          </View>
          
          <View style={[{flexDirection: 'row',justifyContent : 'center'},styles.assets]} >

         <Text style={styles.bleStatusText1}> Bluetooth status : </Text>
         <Text style={[{color : this.props.color },styles.bleStatusText2]} >  {this.props.bleStatus} </Text>

          </View>
      
          <View style= {[{alignItems : 'center',},styles.assets]} >

              <Text style={{color: '#60aec7',fontSize: 18,fontWeight:'bold', }} > Monitoring </Text> 

          </View>

      
      <View style={[{alignItems : 'center'},styles.assets]} >
      <Text style={[{color : this.state.alertColor} ,styles.alert]} > {this.state.alertMessage} </Text> 
        <View style={[{marginTop : 8, },styles.row]}>

        <Text style={styles.nombres }> your condition today is : </Text>
        <View style={{ backgroundColor : this.state.color,height : 30,width : '5%',paddingRight : 20, }} />
        
        </View>

    
    
        <View style={styles.row}>
        <Text style={styles.nombres}> total nombre so far : {this.state.personNombres} </Text>
    
        <TouchableOpacity onPress ={() => this.getStat() } >
            <Image source= {require('../assets/icons/refresh24.png')  }/>
        </TouchableOpacity>
    
        </View>
      </View>


      <View style= {[{alignItems : 'center',},styles.assets]} >

      <Text style={{color: '#60aec7',fontSize: 18,fontWeight:'bold', }} > Statistics </Text> 

      </View>


      <View style={styles.assets} >

      <View style={styles.statistics} >

      <View style={styles.case} >

      <Text style={{color : 'black',fontSize : 13, fontWeight :'bold',  }} > Total nombre : </Text>
      <Text style={{color : 'black',fontSize : 13, fontWeight :'bold', }} > {this.state.infectionTotalNombre} </Text>

      </View>

      <View style={styles.case} >

      <Text style={{ color : '#5cc16d',fontSize : 13, fontWeight :'bold',  }} > Total Recovery : </Text>
      <Text style={{ color : '#5cc16d',fontSize : 13, fontWeight :'bold',  }} > {this.state.infectionTotalRecovery} </Text>

      </View>

      </View>

      <View style={styles.statistics} >

      <View style={styles.case} >

      <Text style={{ color : 'orange',fontSize : 13, fontWeight :'bold',  }} > Today cases : </Text>
      <Text style={{ color : 'orange',fontSize : 13, fontWeight :'bold',  }} > {this.state.todayInfection} </Text>

      </View>

      <View style={styles.case} >

      <Text style={{ color : '#5cc16d',fontSize : 13, fontWeight :'bold',  }} >   Today recovers   : </Text>
      <Text style={{ color : '#5cc16d',fontSize : 13, fontWeight :'bold',  }} > {this.state.todayRecovery} </Text>

      </View>

      </View>

      <View style={styles.statistics} >

      <View style={styles.case} >

      <Text style={{ color : 'red',fontSize : 13, fontWeight :'bold',  }} > Total Death cases : </Text>
      <Text style={{ color : 'red',fontSize : 13, fontWeight :'bold',  }} > {this.state.deathTotalNombre} </Text>

      </View>

      <View style={styles.case} >

      <Text style={{ color : 'red',fontSize : 13, fontWeight :'bold',  }} > Cases died today   : </Text>
      <Text style={{ color : 'red',fontSize : 13, fontWeight :'bold',  }} > {this.state.todayDeath} </Text>

      </View>

      </View>


      </View>


      <View style={styles.assets} >

          <Image source={require('../assets/icons/peoplesavety.jpg')} style={styles.peoplesafety} />

      </View>

    </View>

      <View style={[{display: this.props.displayError,alignItems: 'center'},styles.assets]} >
          <Text style={styles.bletoothErrorText} > Bluetooth is disabled , please enable it. </Text>
          <Image source={require('../assets/icons/bluetoothError.jpg')} style= {styles.bletoothError} />
      </View>


        <Button title='Logout'  color='#a6ddaf' onPress={this.hanldeLogOut}  />
    
        </ScrollView>  
    
        </View>
    
    );
    
    }
    
    }
    
    const styles = StyleSheet.create({
    
        nombres :{
            fontSize: 16,
            fontWeight: "bold",
            paddingRight : 20,
            
    
        },
        background : {
            backgroundColor : '#2C4',
            height : 30,width : '5%',paddingRight : 20,
    
        },
        
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

        communication :  {

          width: '100%',
          height : 180,

        },
        bleStatusText1 : {

          fontSize: 16,
          fontWeight: 'bold',
          color:'black',
        },
        bleStatusText2 : {
          fontSize: 16,
          fontWeight: 'bold',
        },
        peoplesafety : {

          width: '100%',
          height : 500,


        },
        statistics : {

          flexDirection: 'row',
          marginTop : 10,
          marginBottom : 10,

      },
        case : {

          flexDirection : 'row',
          borderWidth: 2,
          borderColor : '#60aec7',
          width: 168,
          height: 60,
          marginRight : 6,
          marginLeft : 4,
          alignItems: 'center',
          textAlign: "center",
          justifyContent : 'center',
          backgroundColor : '#ebfbff',

        },
        header : {
          marginTop: 2,
          marginBottom : 6,
          borderWidth : 2,
          borderColor: '#a6ddaf',

        },
        bletoothErrorText :{
          fontSize: 16,
          fontWeight: 'bold',
          color : 'red',
          paddingTop:5,
          paddingBottom:5,
        },
        bletoothError : {
          width: '100%',
          height : 250,
        },
        alert :{
          fontSize: 16 ,
          fontWeight:'bold',
          paddingLeft : 6,
          paddingRight : 6,
          alignItems : 'center', 
        }

    });
    
