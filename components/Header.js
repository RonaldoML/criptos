import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

export const Header = () => (
  <Text style={styles.encabezado}>Criptomonedas</Text>
);

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    fontFamily: 'Lato-Black',
    backgroundColor: 'rgb(61, 71, 245)',
    textAlign: 'center',
    paddingBottom: 10,
    marginBottom: 30,
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'white',
  },
});
