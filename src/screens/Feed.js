import { StyleSheet, Text, View, Button, Alert, Dimensions, FlatList } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as loginService from '../services/LoginService'
import * as postService from '../services/PostService'
import Registro from '../components/Registro';
import { useIsFocused } from '@react-navigation/native';

export default function Feed(props) {

    const { navigation } = props
    const [posts, setPosts] = useState([])
    const isFocused = useIsFocused();

    const buscarPosts = async () => {
        try {
            let dados = await postService.getPosts(false);
            setPosts(dados);
        } catch (error) {
            Alert.alert("Erro ao buscar dados");
        }
    }



    const logoff = async () => {
        try {
            await loginService.logoff()
            navigation.replace("Login")
        } catch (error) {
            Alert.alert(error)
        }

    }


    useEffect(() => {
      buscarPosts()
    }, [props, isFocused]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Sobre' onPress={() => navigation.navigate("Sobre", { navigation: navigation })} />,
            headerRight: () => <Button title='Logoff' onPress={logoff} />
        })
    }, [])

  return (
    <View>
      <View style={styles.feed}>
        <FlatList
            data={posts}
            renderItem={({ item }) => <Registro dados={item} navigation={navigation} onDelete={buscarPosts} />}
            keyExtractor={item => item.key}
        />
      </View>
      <View style={{
        position: "absolute",
        top: "80%",
        alignSelf: "flex-end",
        paddingRight: 10

      }}>
        <Button title='Fazer um post' onPress={() => navigation.navigate("CadastroPost")} />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({

  feed: {
    width: Dimensions.get("window").width  * 0.97,
    height: Dimensions.get("window").height,
    marginTop: Dimensions.get("window").width * 0.1,
    alignSelf: 'center',
    flexDirection: 'column',
  },

})