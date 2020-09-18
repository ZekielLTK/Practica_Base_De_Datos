import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal,
TouchableWithoutFeedback, Keyboard} from 'react-native';
import {globalStyles} from "../styles/global";
import ReviewDetails from './reviewDetails';
import Card from "../shared/card";
import {MaterialIcons} from "@expo/vector-icons";
import ReviewForm from "./reviewForm";
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('reviewsInformation.db');

const Home = ({ navigation }) => {
    
    useEffect(() => {
        db.transaction(function (tx) {
          tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_reviews'",
          [],
          function (tx , res) {
            if (res.rows.length == 0) {
              tx.executeSql('DROP TABLE IF EXISTS table_reviews');
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS table_reviews(llave INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), rating VARCHAR(6), body VARCHAR(255))'
             );
            }
          }
        );
      });
    }, []);
    let [flatListItems, setFlatListItems] = useState([]);
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_reviews', [], (_,{rows: { _array}}) => {
          setFlatListItems(_array);
        });
      });
    });
    
    const setFlatList = (lista) => {
      setFlatListItems(lista);
    };

    let addReview = (values) => 
        db.transaction((tx) => {
            tx.executeSql(
            'INSERT INTO table_reviews (title, rating, body) VALUES (?,?,?)',
             [values.title, values.rating, values.body], () => {
                db.transaction((tx) => {
                  tx.executeSql('SELECT * FROM table_reviews', [], (_,{rows: { _array}}) => {
                    setFlatListItems(_array);
                  });
                });
              })       
        });
      

    const [modalOpen, setModalOpen] = useState(false);
    
    let deleteReview = (numero) => {
        db.transaction((tx) => {
         tx.executeSql(
         'DELETE FROM  table_reviews where llave = ?',
         [numero], () => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM table_reviews', [], (_,{rows: { _array}}) => {
                setFlatListItems(_array);
              });
            });
          }, [])
        })};

    return(
    <View style= {globalStyles.container}>

        <Modal visible={modalOpen} animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style = {styles.modalContent}> 
                <MaterialIcons 
                    name="close"
                    size={24}
                    onPress={() => setModalOpen(false)}
                    style={{...styles.modalToggle, ...styles.modalClose}}
                />
                <ReviewForm accion={addReview}/>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
        <MaterialIcons 
            name="add"
            size={24}
            onPress={() => setModalOpen(true)}
            style={styles.modalToggle}
        />
        <FlatList
         data = {flatListItems}
         keyExtractor={(item, index) => index.toString()}
         renderItem = {({ item }) => (
            <View style={styles.textoCarta} key={item.llave}>  
                <TouchableOpacity style={styles.boton} onPress = {() => navigation.navigate("ReviewDetails", item)}>              
                    <Card>
                        <Text style={globalStyles.titleText}> {item.title} </Text> 
                    </Card>
                </TouchableOpacity>
                <MaterialIcons name="delete" size={24} onPress={() => deleteReview(item.llave)} style={styles.icon}/>
             </View>
         )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    modalToggle:{
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#f2f2f2",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
    },
    modalClose:{
        marginTop: 10,
        marginBottom: 0,
    },
    modalContent: {
        flex:1
    },
    boton: {
        width: "90%",
    },
    icon: {
        alignSelf: "center",
    },
    textoCarta:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
export default Home;