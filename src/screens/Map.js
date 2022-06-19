import { StyleSheet, View, Button, Alert, Dimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import * as loginService from '../services/LoginService'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'

export default function Menu(props) {

  const user = useSelector(store => store.user)
  const { navigation } = props
  const dados = props.route.params.registro

  const location = {
    coords: {
      latitude: dados.lat,
      longitude: dados.lng,
    }
  };

  const logoff = async () => {
    try {
      await loginService.logoff()
      navigation.replace("Login")
    } catch (error) {
      Alert.alert(error)
    }

  }

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}

      >
        {location && <Marker
          coordinate={
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }
          }
          title={dados.conteudo}
          icon={require("../../assets/my-location-icon.jpg")}

        />}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }

})