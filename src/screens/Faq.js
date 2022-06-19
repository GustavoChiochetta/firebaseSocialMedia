import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

export default function Sobre (props) {
    return (
        <View style={styles.container}>
            <View style={styles.paragrafo}>
                <Text>
                    Funcionalidades: Inicia pelo registro e login do usuário e então, parte para a página 
                    principal, o Feed, onde estão localizados os posts dos usuários. Na tela principal, 
                    ao clicar em um registro que possui localização, partimos para a screen do Maps, onde 
                    aparece a localização e o post ao clicar no ícone.
                </Text>
            </View>
            <View style={styles.paragrafo}>
                <Text>
                    Na tela principal, no canto inferior direito, está o botão que leva para a página de 
                    adicionar um post, onde o usuário informa o conteúdo do post e a localização se quiser, 
                    enviando o registro para o Feed, onde é possível excluí-lo. Além disso, é possível salvar 
                    em rascunho. Caso tenha algum rascunho salvo, é possível enviá-lo como post ou excluí-lo.
                </Text>
            </View>
            <View style={styles.paragrafo}>
                <Text>
                    Na página inicial é possível fazer o logoff pelo header e também ir para a screen de Sobre. 
                    Na screen Sobre, é descrito os dados dos desenvolvedores e também é possível ir para a tela 
                    de FAQ, onde indica as funcionalidades do APP.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: Dimensions.get("window").width  * 0.8,
        height: Dimensions.get("window").height,
        marginTop: Dimensions.get("window").width * 0.1,
    },
    paragrafo: {
        marginVertical: 10,
    },
})