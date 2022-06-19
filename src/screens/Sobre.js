import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'

export default function Sobre (props) {
    const { navigation } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title='Faq' onPress={() => navigation.navigate('Faq')} />
        })
    }, [])

    return (
    <View style={styles.container}>
        <View style={styles.paragrafo}>
            <Text style={styles.titulo}>Gabriel Ferrari Sur</Text>
            <Text>
                Natural de Erechim, 20 anos, sexto semestre de CC, trabalhando de desenvolvedor Delphi.
            </Text>
        </View>
        <View style={styles.paragrafo}>
            <Text style={styles.titulo}>Marco Luigi Bacchi</Text>
            <Text>
                Natural de Passo Fundo, 21 anos, sexto semestre de CC, trabalhando de suporte..
            </Text>
        </View>
        <View style={styles.paragrafo}>
            <Text>
                O APP foi feito em EXPO, pela facilidade de compilar em Android, 
                praticidade de utilizar o framework, além disso, levamos em conta que 
                já tínhamos o Expo baixado e a conta criada.
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
    titulo: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 20,
    }
})