import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divisor } from '../../Components/Divisor';
import api from '../../services/api';
import { styles } from './styles';
import { Creditos } from '../Creditos';

export function UtilizarCredito({route}){
    const [txtsenha, setSenha] = useState('');
    const [lista, setLista] = useState(null);
    const [totallitros, setTotalLitros] = useState(0);
    const [total, setTotal] = useState(0);
    const [codigo, setCodigo] = useState('');
    const [blockbtn, setBlockbtn] = useState(false);

    useEffect(() => {
        listar = async () => {
            const token = await AsyncStorage.getItem('@FuelSupply:token');
            const array = route.params.codigos.map(c=>{return {"codigo":c}});
            const response = await api.post('/compracredito/list/finalizacao', { token, array } );
            const creditos = response.data.compracredito;
    
            setLista(creditos);
            console.log('creditos = ', lista);

            let tamanho = creditos.length;
            let somalitros = 0;
            let somatotal = 0;
            
            for(let i = 0; i < tamanho; i++){
                let litrosatual = creditos[i].litros;
                somalitros = somalitros + litrosatual;

                let valoratual = creditos[i].valortotal;
                somatotal = somatotal + valoratual;

                setTotalLitros(somalitros);
                setTotal(somatotal);
            }

            console.log('litros: ', totallitros, ' Total: ', total)
        }
        listar()
    },[])

    verficaSenha = () => {
        if(txtsenha === undefined || txtsenha === '')
            return false;
        return true;
    }

    getCodCaixaUso = async () => {
        let dia = new Date().getDate();
        let mes = new Date().getMonth() + 1;
        let ano = new Date().getFullYear();

        const senha = verficaSenha() ? txtsenha : Alert.alert('Ocorreu um erro', 'Verifique se a senha foi preenchida corretamente');;
        const posto = route.params.cnpj;
        const data = ano + '/' + mes + '/' + dia;
        const valortotal = total;
        const litros = totallitros;
        
        const response = await api.post('/caixauso/', { senha, posto, data, valortotal, litros } );
        let codcaixauso = response.data.mensagem.mensagem.codigo;
        setCodigo(codcaixauso)
        const resposta = response.ok;

        console.log('cod caixa: ', codcaixauso)

        if(resposta === true){
            validarCredito()
            setBlockbtn(true)  
        }
        else{
            Alert.alert('Ocorreu um erro', 'Tente novamente');
            setBlockbtn(false)
        }
    }

    validarCredito = async () =>{
        let posto = route.params.cnpj;
        
        let array = []
        lista.forEach(element => {
            array.push({
               codigocaixauso: codigo,
               posto: posto,
               credito: element.codigo 
            })
        });
        
        const token = await AsyncStorage.getItem('@FuelSupply:token');
        const response = await api.post('/caixausocredito/', { token, array })
        const resposta = response.ok;

        if(resposta === true){
            alterarCredito(array)
            setBlockbtn(true)
        }
        else{
            Alert.alert('Ocorreu um erro', 'Não foi possível completar essa ação, tente novamente');
            setBlockbtn(false)
        }
    }

    alterarCredito = async (array) => {
        const token = await AsyncStorage.getItem('@FuelSupply:token');
        const response = await api.patch('/compracredito/util', { token, array })
        setBlockbtn(true)

        console.log(response.data)   
    }
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.ativarcredito}>
                <View style={styles.infocredito}>
                    <FlatList 
                        data={lista}
                        keyExtractor={item => item.codigo.toString()}
                        renderItem={ ( { item } ) =>
                            <>
                                <View style={styles.list}>
                                    <Text style={styles.text}>{item.codigo}</Text>
                                    <Text style={styles.text}>{item.combustivel}</Text>
                                    <Text style={styles.text}>{item.litros} litro(s)</Text>
                                    <Text style={styles.text}>R${item.valortotal.toFixed(2)}</Text>
                                </View>
                                <Divisor />
                            </>
                        }
                    />
                </View>
                <View style={styles.totalcredito}>
                    <Text style={styles.text}>{totallitros} litro(s)</Text>
                    <Text style={styles.text}>Total R${total.toFixed(2)}</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Senha...'
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={txtsenha}
                        onChangeText={(text) => setSenha(text)}
                    />
                    <TouchableOpacity style={styles.btn} disabled={blockbtn} activeOpacity={0.8} onPress={() => getCodCaixaUso()}>
                        <Text style={styles.txtbtn}>Ativar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.viewcodigo}>
                <Text style={styles.txtcod}>
                    Código de uso: {codigo}
                </Text>
            </View>

            <Text style={styles.mensagem}>
                Informe o código acima para que o posto libere seu abastecimento
            </Text>
        </SafeAreaView>
    );
}