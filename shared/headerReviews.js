import React from "react";
import {StyleSheet, Text, View} from "react-native";


export default function HeaderReviews({title,}){
    return(
        <View style={styles.header}>
            <View style={styles.header}>
                <Text style= {styles.headerText}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    headerText:{
        fontWeight: "bold",
        fontSize: 20,
        color: "#333",
        letterSpacing: 1,
    },
})