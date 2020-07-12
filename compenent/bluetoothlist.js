/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
 import React, {useState, useEffect} from 'react';
 import BluetoothSerial, { isEnabled } from 'react-native-bluetooth-serial-next';
 import StateRefresh from './statRefresh';
 import {useBluetoothStatus} from 'react-native-bluetooth-status';
 import * as firebase from 'react-native-firebase';
 


 function BluetoothList(props){
   
     const [List, setList] = useState([]);
     const [BleEnable,setBleEnable] = useState(false);


     

     const  ShowCurrentDate = ()=>{
 
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
       
        if(day < 10 && month < 10){
        var date = '0' + day + '/0' + month + '/' + year; 
        return date;
        }

        else if(day < 10 ){
        var date = '0' + day + '/' + month + '/' + year; 
        return date;
        }

        else if( month < 10){
        var date =  day + '/0' + month + '/' + year; 
        return date;
        }
        


       };


       const [btStatus, isPending, setBluetooth] = useBluetoothStatus();
       var BluetoothDeviceName;
       var sqlite = require('react-native-sqlite-storage');
       var db = sqlite.openDatabase({name:'test',createFromLocation:'~test.db'}
       ,() => {console.log('database opened');}, 
       (error) => {console.log(error);}
       );

       db.transaction((tx)=>{

        tx.executeSql('SELECT firebaseid FROM usertablecondition1;',[],(tx,results)=>{


            BluetoothDeviceName = 'VTRACKER:' + results.rows.item(0).firebaseid;

        })


       })
    


         useEffect(() => {
                    
         async function init() {
             
            
            
             

                 const isenable = await BluetoothSerial.isEnabled();
                 if (!isenable) {
                     await BluetoothSerial.cancelDiscovery();
                     await BluetoothSerial.stopScanning();
                     setList([]);

                 }
                 else {
                 const newlist = await BluetoothSerial.discoverUnpairedDevices();
                 setList([]);
                 setList(newlist);
                 setBleEnable(true);
                 console.log(newlist);
                 const name = await BluetoothSerial.setAdapterName(BluetoothDeviceName);

                }

                

             
         }
         let mounted = true;
         if (mounted){
         init();
        }
        else {
         return () => {
             async function remove() {
                 await BluetoothSerial.stopScanning();
                 console.log('Scanning stoped...');

             }
             mounted = false 
             remove();
         };
        }
     },[BluetoothDeviceName, List])

     const Data = List;


     useEffect(() => {

        async function basedonee(){

            var sqlite = require('react-native-sqlite-storage');
            let db = sqlite.openDatabase({name:'test',createFromLocation:'~test.db'}
            ,() => {console.log('database opened');}, 
            (error) => {console.log(error);}
            );

            Data.map(list => {

                var check = list.name.search('VTRACKER:');
                
        if (check != -1){

            var ref = list.name.replace('VTRACKER:','');

                db.transaction((tx) =>{
                    tx.executeSql(' SELECT * FROM persons1 WHERE mac =?  ; ',[list.id],(tx,results) => {
                        console.log('------------------------------');
                        var len = results.rows.length;
                        console.log(len);
                        if (len === 0) {
                            tx.executeSql('INSERT INTO persons1 VALUES (?,?,?);',[list.id,ref,ShowCurrentDate()],(tx,result)=>{
                                console.log('data inserted');
                                
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
                            
                        }
                        else {
                            console.log('data was not inserted');
                        }
                       
                   
                    });
                });

            }
                               }
       
            )
        }
        console.log('Bluetooth on : ' + btStatus);
        if (btStatus == true){

        basedonee();
    }
         

     })
    
     if (btStatus == true){
         var bleStatus = 'Active';
         var color = '#a6ddaf';
         var displayActive = 'flex';
         var displayError = 'none';

     }
     else {
        var bleStatus = 'Shut';
        var color = 'red';
        var displayActive = 'none';
        var displayError = 'flex';

    }

      
       

      

        

     
      return(
          <StateRefresh bleStatus={bleStatus} color={color} displayActive={displayActive} displayError={displayError} />
      );
     
     

 }

 export default BluetoothList;
