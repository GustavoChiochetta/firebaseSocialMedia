import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import * as postService from '../services/PostService';
import { useSelector } from 'react-redux';

export default function Registro(props) {

    const data = props.dados
    const user = useSelector(store => store.user)
    const { navigation } = props

    const localizarPost = () => {
        if (data.endereco) {
            props.navigation.navigate("Map", { registro: data });
        } else {
            Alert.alert('Esse post não possui endereço vinculado');
        }
    };

    const savePost = async () => {
        await postService.createPost(data, user.uid, false);
        Alert.alert("Dados Registrados com Sucesso");
        navigation.navigate("Feed");
    };

    const excluirPost = () => {
        Alert.alert("Deseja Excluir:", "Esses dados serão apagados para sempre!", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "OK", onPress: async () => {
                    try {
                        await postService.deletePost(data.key, props.isDraft);
                        Alert.alert("Post Excluído com Sucesso");
                        props.onDelete();
                    } catch (error) {
                        Alert.alert("Você não possui permissão para excluir esse registro!");
                    }
                }
            }
        ])

    }


    return (
        <TouchableOpacity onPress={localizarPost}>
            <View style={styles.container}>
                <View style={styles.linha}>
                    <View style={styles.coluna}>
                        <Text style={styles.conteudo}>{data.conteudo}</Text>
                    </View>
                </View>
                <View style={styles.linha}>
                    <View style={styles.coluna}>
                        <Text style={styles.campo}>Onde estou:</Text>
                        <Text>{data.endereco ? data.endereco : 'Não informado'}</Text>
                    </View>
                </View>
                <View style={styles.linha}>
                    <View style={styles.coluna}>
                    </View>
                    <View style={styles.coluna}>
                    </View>
                    <View>
                        {!props.isDraft ? (
                            <>
                                <Button title='Excluir' color={'red'} onPress={excluirPost} />
                            </>
                        ) : (
                                <View style={styles.buttons}>
                                    <Button title='Excluir' color={'red'} onPress={excluirPost} />
                                    <Button title='Salvar' color={'blue'} onPress={savePost} />
                                </View>
                            )
                        }
                    </View>
                </View>
            </View >
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        margin: 5
    },
    conteudo: {
        fontSize: 17,
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        flexDirection: "row"
    },
    campo: {
        width: 90
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'center',
    }

})