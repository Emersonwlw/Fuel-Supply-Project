import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, Alert } from 'react-native';
import { Load } from '../../Components/Load';
import { Divisor } from '../Divisor';
import api from '../../services/api';
import { styles } from './styles';

export function ModalComprar(props){
    const [loading, setLoading] = useState(null)
    let [valorcompra, setValorCompra] = useState('')
    let [totallitros, setTotalLitros] = useState(0)
    const [data, setData] = useState(null)

    useEffect(() => {
        let dia = new Date().getDate()
        let mes = new Date().getMonth() + 1
        let ano = new Date().getFullYear()
        let hora = new Date().getHours()
        let min = new Date().getMinutes()
        let sec = new Date().getSeconds()

        setData(ano + '/' + mes + '/' + dia + ' ' + hora + ':' + min + ':' + sec)
        console.log('data = ', data)
    }, [])

    calcularTotalLitros = () => {
        let precol = props.valor
        let total = (valorcompra / precol).toFixed(2)
        setTotalLitros(total)
    }

    verificaCampo = () => {
        if(valorcompra === '' || valorcompra === undefined || valorcompra === null){
            Alert.alert('Ocorreu um erro', 'Informe o valor que deseja comprar em créditos')
            return false;
        }
        return true;
    }

    comprar = async () => {
        setLoading(true)

        let response = await AsyncStorage.getItem("@FuelSupply:usuario");
        let json = JSON.parse(response);
        let user = json.data.Usuario.cpf

        if(verificaCampo()){
            try{
                const response = await api.post("/compracredito", {
                    usuario: user,
                    posto: props.cnpj,
                    combustivel: props.codigo,
                    valorcombustivel: props.valor,
                    data: data,
                    litros: totallitros,
                    valortotal: valorcompra,
                    status: 'Disponível'
                });

                console.log(response)
                console.log("Compra crédito realizada")
                setLoading(false)
                props.close
            }
            catch(error){
                setLoading(false)
                console.log("Erro: " + error);
                Alert.alert('Não foi possível efetuar a compra','Ocorreu um erro ao efetuar a compra, tente novamente.', [{
                    text: 'Ok', onPress: props.close
                }])
                props.close
            }  
        }    
    }

    return (
        <View style={styles.container}>
            <View style={styles.configTela}>
                <Text style={styles.titulo}>{`${props.comb} - R$ ${props.valor} (litro)`}</Text>
                <Divisor />
                <TextInput
                    placeholder='Valor da compra...'
                    keyboardType='numeric'
                    style={styles.input}
                    value={valorcompra}
                    onChangeText={(text) => {setValorCompra(text)}}
                    onEndEditing={() => calcularTotalLitros()}
                />
                <View style={styles.viewTotal}>
                    <Text style={styles.text}>Total de litros:</Text>
                    <Text style={styles.totalLitro}>{totallitros}</Text>
                </View>
                {
                    loading ?
                    <Load />
                    :
                    <Pressable 
                        style={styles.btn}
                        onPress={() => {
                            comprar()
                            Alert.alert('Compra efetuada', 'Sua compra foi realizada com sucesso!', [{
                                text:'Ok', onPress: props.close
                            }])
                        }} 
                    >
                        <Text style={styles.textBtn}>Comprar</Text>
                    </Pressable>
                }
            </View>
        </View>
    );
}