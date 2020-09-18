import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {globalStyles} from "../styles/global";
import Card from "../shared/card";
import {MaterialIcons} from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';
import ReviewForm from "./reviewForm";
import setFlatList from "./home";
var db = SQLite.openDatabase('reviewsInformation.db');


const ReviewDetails = ({route, navigation}) => {
  
    const {title} = route.params;
    const {body} = route.params;
    const {rating} = route.params;
    const {llave} = route.params;
    const images = {
        ratings: {
            '1': require("../assets/rating-1.png"),
            '2': require("../assets/rating-2.png"),
            '3': require("../assets/rating-3.png"),
            '4': require("../assets/rating-4.png"),
            '5': require("../assets/rating-5.png"),
        },
    };

    let updateReview = (values) =>{
    db.transaction((tx) => {
        tx.executeSql(
          'UPDATE table_reviews set title=?, body=? , rating=? where llave=?',
          [values.title, values.body, values.rating, llave], () => navigation.goBack()
          )})};


    const [openModal,setOpenModal] = useState(false);
    return(
    <View style= {globalStyles.container}>
        <Modal visible={openModal} animationType="slide" >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style = {styles.modalContent}> 
                <MaterialIcons 
                    name="close"
                    size={24}
                    onPress={() => setOpenModal(false)}
                    style={styles.modalToggle}
                />
                <ReviewForm accion={updateReview} />
            </View>
            </TouchableWithoutFeedback>
        </Modal>
        <MaterialIcons name="edit" size={30} style={styles.icon} onPress={() => setOpenModal(true)}/>
        <View style={styles.carta}>
        <Card>
            <Text>{ title }</Text>
            <Text>{ body }</Text>
            <View style={styles.rating}>
                <Text> GameZone ratings:</Text>
                <Image source={images.ratings[rating]}/>
            </View>
        </Card>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    rating: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    icon: {
        position: "absolute",
        marginTop: 10,
        right: "0%",
    },
    carta: {
        marginTop: 20,
    },
    modalToggle:{
        borderWidth: 1,
        borderColor: "#f2f2f2",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    modalContent: {
        flex: 1,
    }
});
export default ReviewDetails;