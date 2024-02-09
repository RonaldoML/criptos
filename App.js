/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Cotizacion } from './components/Cotizacion';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptoMoneda] = useState('');

  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const cotizar = async () => {
      if (consultarApi) {
        //consulta de api para obtener la cotización
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
        setConsultarApi(false);
      }
    }
    cotizar();
  }, [consultarApi])

  return (
    <ScrollView>
      <Header />

      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptoMoneda={setCriptoMoneda}
          setConsultarApi={setConsultarApi}
        />
      </View>

      <View style={{marginTop: 40}}>

        {consultarApi
          ?
          <ActivityIndicator size='large' color='rgb(61, 71, 245)' />
          :
          <Cotizacion resultado={resultado} />
        }

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
