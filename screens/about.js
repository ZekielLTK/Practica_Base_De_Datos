import React from "react";
import {Text, Image, StyleSheet, View} from "react-native";



const ViewAllUser = ({navigation}) => {
    return(
    <View>
    <Text > Hola </Text>
    <Image source={require("../assets/heart_logo.png")} style={styles.image}/>
        <View></View>
        <View style={styles.View}>
            <Text > Si nos quieres ubicar </Text>
            <Text style={styles.texto} onPress={() => navigation.navigate("ver") }> Hola </Text>
        </View>
    </View>
    )};

const styles = StyleSheet.create({
    image: {
        alignSelf: "center",
        resizeMode: "contain",
        width: "50%", 
    },
    texto: {
        color: "blue",
    },
    View:{
        flexDirection: "row",
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: "grey",
    },
});
export default ViewAllUser;