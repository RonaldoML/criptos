import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { monedas } from '../data/data';





export const Formulario = ({moneda, criptomoneda, setMoneda, setCriptoMoneda, setConsultarApi}) => {


    const [criptomonedas, setCriptoMonedas] = useState([]);

    useEffect(() => {
        const consultar = async () => {
            try {
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const resultado = await axios.get(url);

                setCriptoMonedas(resultado.data.Data);
            } catch (error) {
                Alert.alert(
                    'Error...',
                    'Error de conexión',
                    [{text: 'OK' }]
                );
            }

        }
        consultar();
    }, [setCriptoMonedas])

    const handleObtenerMoneda = (e) => {
        setMoneda(e);
    }

    const handleObtenerCriptomoneda = (e) => {
        setCriptoMoneda(e);
    }

    const handleCotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return
        }

        setConsultarApi(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [{text: 'OK' }]
        );
        //Pasa la validación

    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => handleObtenerMoneda(moneda)}
                itemStyle={{ height: 100}}
            >
                <Picker.Item label='-Seleccione -' value=''></Picker.Item>
                {monedas.map(m => (
                    <Picker.Item label={m.label} value={m.value} key={m}></Picker.Item>
                ))}

            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={cripto => handleObtenerCriptomoneda(cripto)}
                itemStyle={{ height: 100}}
            >
                <Picker.Item label='-Seleccione -' value=''></Picker.Item>
                {
                    criptomonedas.map(cm => (
                        <Picker.Item key={cm.CoinInfo.Id} label={cm.CoinInfo.FullName} value={cm.CoinInfo.Name}></Picker.Item>
                    ))
                }

            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => handleCotizarPrecio() }
            >
                <Text style={styles.txtCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}


const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: 'rgb(61, 71, 245)',
        padding: 10,
        marginTop: 20
    },
    txtCotizar: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
})
