import React from "react";
import {Text, StyleSheet, View} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

const ViewAllUser = () => {
  return (
    <View>
      <Text style={styles.texto}> Nuestra sede se encuentra en: </Text>
      <MapView style={styles.mapa} 
      initialRegion={{ latitude: 23.752538, longitude: -99.141926, latitudeDelta: 0.01, longitudeDelta: 0.01}}
      >
        <Marker coordinate={{latitude: 23.752388, longitude: -99.142277}}
        title="El Estarbocks"
        description="Esto es el Estarbocks"
        />
      </MapView>
    </View>
)};

const styles = StyleSheet.create({
  mapa: {
    height: 300,
    marginHorizontal: 20,
  },
  texto: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "500"
  },
});
export default ViewAllUser;