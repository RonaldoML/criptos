import {axios} from 'axios';

export const obtenerCriptomonedas = async () => {
    try {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const resultado = await axios.get(url);
        console.log(resultado);
        return resultado.data.Data;
    } catch (error) {
        return [];
    }
}