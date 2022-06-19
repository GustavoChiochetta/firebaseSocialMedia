import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Switch } from 'react-native';
import * as postService from "../services/PostService"
import Registro from '../components/Registro';
import { useSelector } from 'react-redux';

export default function CadastroPet(props) {

    const [form, setForm] = useState({})
    const [posts, setPosts] = useState([]);
    const [isDraft, setIsDraft] = useState(false);
    const toggleSwitch = () => setIsDraft(previousState => !previousState);
    const { navigation } = props
    const user = useSelector(store => store.user)

    const buscarPosts = async () => {
        try {
            let dados = await postService.getPosts(true);
            setPosts(dados);
        } catch (error) {
            Alert.alert("Erro ao buscar dados");
        }
    }

    const efetuarCadastro = async () => {
        if (form.conteudo) {
            try {
                await postService.createPost(form, user.uid, isDraft);
                Alert.alert("Dados Registrados com Sucesso")
                setForm({})
                if (!isDraft) {
                    navigation.navigate("Feed", { atualizar: true })
                }
            } catch (error) {
                Alert.alert("Erro ao registrar", "Verifique os campos!")
            }
        } else {
            Alert.alert("Campos não preenchidos corretamente!")
        }
    }

    useEffect(() => {
        buscarPosts();
    }, [posts]);

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>Novo Post:</Text>
            <Text style={{ textAlign: "center" }}>{user.email}</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder='O que você gostaria de dizer?'
                    value={form.conteudo}
                    onChangeText={(value) => setForm(Object.assign({}, form, { conteudo: value }))}

                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Onde você está?'
                    value={form.endereco}
                    onChangeText={(value) => setForm(Object.assign({}, form, { endereco: value }))}

                />
            </View>
            <View style={styles.switch}>
                <Text>Salvar nos Rascunhos?</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDraft ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isDraft}
                />
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Button
                        title='Enviar'
                        onPress={efetuarCadastro}
                    />
                </View>
            </View>
            <StatusBar style="auto" />
            <FlatList
                data={posts}
                renderItem={({ item }) => <Registro dados={item} navigation={navigation} onDelete={buscarPosts} isDraft={true}/>}
                keyExtractor={item => item.key}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }, input: {
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        width: "99%",
        padding: 3,
        borderRadius: 5
    }, switch: {
        margin: 5,
        width: "99%",
        padding: 3,
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 5
    }
});