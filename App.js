/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import Routes from './compenent/routes';
import LoadingScreen from './compenent/loadingscreen';

import HomePage from './homsescreen/homescreen';

import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { cond } from 'react-native-reanimated';




 

/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */



                                       const appStack = createStackNavigator({
                                          Home : {
                                            screen : HomePage,
                                          },
     
                                         },
                                        {
                                          defaultNavigationOptions : {
                                            header: null,
                                          },
                                        } 
   
                                       );

                                       const AuthStack = createStackNavigator({
                                          Login : {
                                            screen : Routes,
                                          },
                                       },
                                       {
                                         defaultNavigationOptions : {
                                           header: null,
                                         },
                                       } 

                                       )



                                       export default createAppContainer(
                                         createSwitchNavigator({
                                           Loading : LoadingScreen,
                                           App : appStack,
                                           Auth : AuthStack,
                                         },

                                         {
                                           initialRouteName : "Loading"
                                         }
  
                                         )
                                       )




  

              //                     export default function App(){
  
              //                                var sql = require('react-native-sqlite-storage');
              //                                var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
              //                                (error) => console.log(error)    );
  
              //                               db.transaction((tx)=>{

              //                               tx.executeSql('CREATE TABLE "persons2" ( "mac"	TEXT NOT NULL,"ref"	TEXT NOT NULL,"date"	TEXT NOT NULL,PRIMARY KEY("mac");',[],(tx,result)=>{              

              //                                   console.log('database created' );

              //                               })


              //                             })




               
  
              //                                        return (
              
  
              //                                              <View>
              //                                                <Text>  hello there</Text>
  
              //                                              </View>
  
  
              
              //                                        )
              
  
  
              //                              }
  
  





              //                    export default function App(){


              //                        var sql = require('react-native-sqlite-storage');
              //                        var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
              //                        (error) => console.log(error)    );

              //                        var database = firebase.database();
              //                        var uid = firebase.auth().currentUser.uid;

              //                        db.transaction((tx)=>{

              //                          tx.executeSql('SELECT count(*) as usersnombre FROM persons1;',[],(tx,res)=>{

              //                            var len = res.rows.item(0).usersnombre;

              //                            if ( len == 0 ){

              //                              database.ref('/users/'+uid+'/')
              //                              .child('firstLogin')
              //                              .once('value',function(snap){

              //                               var firstLogin = snap.val();
              //                               if (firstLogin == 'false'){
              
              //                                database.ref('/users/' + uid + '/')
              //                                .child('list')
              //                                .once('value',function(snapshot){


              //                                    var list = snapshot.val();

              //                                    list.map(elem=>{

              //                                      if(elem){

              //                                        db.transaction((tx)=>{

              //                                          tx.executeSql('INSERT INTO persons1 VALUES (?,?,?);',[elem.mac,elem.ref,elem.date],(tx,result)=>{
              //                                            console.log('data loaded from firebase');
              //                                        });



              //                                        })

              //                                      }


              //                                    })


              //                                })




              

              //                               }


              //                              })
            


              //                            }



              //                          })

              //                        })






              //                    }











              //                 important to create database if it deletede , this is the only code that created do not delete this code

      
              //              export default class App extends React.Component{


              //                handedb =() => {
              //                   var  SQLite = require('react-native-sqlite-storage');

              //                    const db = SQLite.openDatabase("test.db", "1.0", "Demo", -1);
              //                   const db = SQLite.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
              //                                 (error) => console.log(error) );


              //                                const db = SQLite.openDatabase({name:'test',createFromLocation : '~test.db' ,location:'default'},
              //                                ()=>{console.log('cb.message')},(err)=>{console.log(err.message)}
              //                                );
                 
              //                             db.transaction(function(txn){
              //                               console.log('fdzehiueh');

                 
              //                              txn.executeSql('select * from persons1;',[],function(tx,res){


              //                                  console.log(res.rows.raw());
              


              //                              })


              //                             })
              //                            }

              //                      render(){
              //                             return (
          

              //                                   <View>
              //                                     <Text>  hello there</Text>
              //                                        <Button title="click" onPress ={this.handedb}  />
              //                                   </View>


          
              //                             )
              //                      }


              //                   }








              //        export default class App extends React.Component{

              //            state = {
              //              createLocalDB : true,
              //            }


              //          handedb =() => {

              //           var  SQLite = require('react-native-sqlite-storage');

              //                    const db = SQLite.openDatabase({name : 'test',createFromLocation: '~test.db' },()=> console.log('database openend (2)'),
              //                                  (error) => console.log(error) );

              //                    const db = SQLite.openDatabase('test.sqlite', '1.0', 'Demo', -1);

      
              //                             db.transaction(function(txn){
              //                                console.log('fvjdjdjb');
                     
              //                              txn.executeSql('select * from usertablecondition1;',[],function(tx,res){
    
    
              //                                  console.log(res.rows.raw());
                  
    
    
              //                              })
    
    
              //                             })



              //                           if ( this.state.createLocalDB == true  ) {  

              //                           var  SQLite = require('react-native-sqlite-storage');
              //                           const db = SQLite.openDatabase('test.db', '1.0', 'Demo', -1); 
                           
              //                           db.transaction((tx)=>{

              //                           tx.executeSql('CREATE TABLE "persons1" ( "mac"	TEXT NOT NULL, "ref"	TEXT NOT NULL, "date"	TEXT NOT NULL, PRIMARY KEY("mac") );',[],(tx,res)=>{
                            
              //                             console.log('persons1 table created');
              //                             tx.executeSql('CREATE TABLE "usertablecondition1" ( "id"	INTEGER NOT NULL, "condition"	TEXT NOT NULL, "firebaseid"	TEXT NOT NULL, PRIMARY KEY("id") );',[],(tx,results)=>{
                              
              //                               console.log('usertablecondition1 table created');
              //                               tx.executeSql('UPDATE usertablecondition1 set condition=? where id=1 ;',[],(txn,resu)=>{

              //                                 console.log('usertablecondition1 updated;');
              //                                 this.setState({ createLocalDB : false})
              //                               })
                              


              //                             })


              //                           })


              //                           })
                        
                        
                        
                        
                        
              //                         }



              //                         }
    


              //                     render(){

              //                       if ( this.state.createLocalDB == true  ) {  

              //                         var  SQLite = require('react-native-sqlite-storage');
              //                         const db = SQLite.openDatabase('test.db', '1.0', 'Demo', -1); 
                         
              //                          db.transaction((tx)=>{

              //                          tx.executeSql('CREATE TABLE "persons1" ( "mac"	TEXT NOT NULL, "ref"	TEXT NOT NULL, "date"	TEXT NOT NULL, PRIMARY KEY("mac") );',[],(tx,res)=>{
                          
              //                            console.log('persons1 table created');
              //                            tx.executeSql('CREATE TABLE "usertablecondition1" ( "id"	INTEGER NOT NULL, "condition"	TEXT NOT NULL, "firebaseid"	TEXT NOT NULL, PRIMARY KEY("id") );',[],(tx,results)=>{
                            
              //                              console.log('usertablecondition1 table created');
              //                              tx.executeSql('insert into usertablecondition1 values (?,?,?);',[1,'green','null'],(txn,resu)=>{

              //                                console.log('usertablecondition1 updated;');
              //                                this.setState({ createLocalDB : false})
              //                              })
                            


              //                            })


              //                          })


              //                          })


              //                          db.transaction((tx)=>{

              //                            tx.executeSql('drop table persons1;',[],(tx,res)=>{

              //                              console.log('persons1 table droped');
              //                              tx.executeSql('drop table usertablecondition1;',[],(tx,resu)=>{

              //                                  console.log('usertablecondition1 table droped');

              //                              })

              //                            })


              //                          })
                      
                      
                      
                      
                      
              //                       }
              //                       else {

              //                         console.log('db created');

              //                       }


              //                            return (

                              
    
              //                                  <View>
              //                                    <Text>  hello there</Text>
              //                                       <Button title="click" onPress ={this.handedb}  />
              //                                  </View>
    
    
              
              //                            )
              //                     }






              //        }


              //        search specific value and cut it out


              //      export default class App extends React.Component{


              //        state = {
              //          expression : '',
              //          wordToSearch : '',
              //          result : '',
              //        }

              //         search=()=>{

              //            var hold = this.state.expression;
              //            var res = hold.replace(this.state.wordToSearch,'');

              //            this.setState({ result : res });
              //         }


              //        render(){
              //          return (
              //            <View style={styles.container} >

              //            <Text> {this.state.result} </Text>

              //            <View style={styles.front} >

              //            <TextInput placeholder='Enter your expression ' placeholderTextColor='white' 
              //                          style={styles.TextInput} 
              //                          onChangeText={expression => this.setState({ expression })}
              //                          value={this.state.expression}
              //                          autoCapitalize="none"
              //                           /> 
              //            </View>


              //            <View style={styles.front} >

              //            <TextInput placeholder='Enter the expression to search' placeholderTextColor='white' 
              //                          style={styles.TextInput} 
              //                          onChangeText={wordToSearch => this.setState({ wordToSearch })}
              //                          value={this.state.wordToSearch}
              //                          autoCapitalize="none"
              //                           /> 
              //            </View>

              //            <View>

              //              <Button  onPress={this.search} title='Search'  style={styles.button}  />

              //            </View>



              //            </View>
   
              //          )
              //        }





              //      }


              //      const styles = StyleSheet.create({

              //        container : {
              //          flex : 1,
              //          backgroundColor: '#60aec7',

              //        },
              //        front : {
              //          marginTop : 28,
              //          marginBottom: 8,
              //          marginLeft : 10,
              //        },
              //        TextInput : {
              //          padding : 13,
              //          color : 'black',
              //          borderWidth :2 ,
              //          borderColor : '#a6ddaf',
              //        },

              //        button : {
              //           color : 'white',
              //           backgroundColor : 'blue',
              //           marginTop : 10,
              //        },


              //      });



              //     export default function App(){


              //       var sql = require('react-native-sqlite-storage');
              //        var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
              //        (error) => console.log(error)    );


              //        db.transaction((tx)=>{
              //          tx.executeSql('select * from usertablecondition1;',[],(tx,res)=>{

              //           console.log(res.rows.raw());

              //          })
              //        })


              //   return (

              //     <View>
              //       <Text>Hello Big NOOB</Text>
              //     </View>


              //   )




              //     }



              //  export default function App(){


              //        var sql = require('react-native-sqlite-storage');
              //        var db = sql.openDatabase({name : 'test',createFromLocation: '~test.db'},()=> console.log('database openend (2)'),
              //        (error) => console.log(error)    );


              //    db.transaction((tx)=>{


              //     tx.executeSql('select *  from usertablecondition1;',[],(tx,res)=>{

              //          console.log(res.rows.raw());


              //      })



              //    });


              //      return (

              //        <View>
              //          <Text>hello from the other</Text>
              //        </View>

              //      )



              //  }





