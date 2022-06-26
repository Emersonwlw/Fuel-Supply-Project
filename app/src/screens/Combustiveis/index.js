import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { theme } from "../../global/styles/theme";
import { styles } from './styles';

import api from "../../services/api";
import { Load } from '../../Components/Load';
import { Divisor } from "../../Components/Divisor";
import { ModalComprar } from '../../Components/ModalComprar';

export function Combustiveis(){
    const [lista, setLista] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [combClicado, setCombClicado] = useState(null);
    const [valorClicado, setValorClicado] = useState(null);
    const [codigoClicado, setCodigoClicado] = useState(null);
    const [cnpjClicado, setCpnjClicado] = useState(null);

    function openModal(){
        setModalVisible(true)
    }

    function closeModal(){
        setModalVisible(false)
    }

    useEffect(() => {
        listar = async () => {
            const response = await api.get('/combustivel/list');
            const comb = response.data.Combustiveis;
    
            setLista(comb);
            setLoading(false);
    
            console.log('Combs: ', comb)
        } 
        listar()
    }, [])

    function verificaLetra(letra){
        let letrainicial, i
        for(i in letra){
            letrainicial = letra[0]
        }
        return letrainicial;
    }

    function verificaCor(combustivel){
        let comb = combustivel
        let cor = '#C55B1D'

        if(comb.indexOf('Gasolina') != -1){
            cor = '#A42424'
            return cor
        }
        if(comb.indexOf('Etanol') != -1){
            cor = '#268D24'
            return cor
        }
        if(comb.indexOf('Diesel') != -1){
            cor = '#4E504E'
            return cor
        }
        return cor
    }

    return(
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.pesquisar}>
                    <TextInput 
                        placeholder='Pesquisar...'
                        style={styles.input}
                    />
                    <FontAwesome name='search' size={22} color={theme.colors.amarelo} style={styles.icon}/>
                </View>

                <View style={styles.viewBtn}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
                        <Text style={styles.textBtn}>
                            Filtrar
                        </Text>
                        <FontAwesome 
                            name='align-center' size={22} color={theme.colors.amarelo} style={{marginLeft: 15}}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.viewTitulo}>
                <Text style={styles.titulo}>
                    Tudo
                </Text>
            </View>

            <View style={{ marginBottom: 140 }}>
                {
                    loading ?
                    <Load />
                    :
                    <FlatList
                        data={lista}
                        keyExtractor={item => item.Codigo.toString()}
                        renderItem={ ( { item } ) =>
                            <View style={styles.containerComb}>
                                <View style={styles.containerList}>
                                    <View style={{ backgroundColor: verificaCor(item.Nome), width: 105, justifyContent: 'center', height: 105, alignItems: 'center'}}>
                                        <Text style={styles.textImg}>{verificaLetra(item.Nome)}</Text>
                                    </View>
                                    <View style={{ marginLeft: 8 }}>
                                        <Text style={styles.tituloComb}>{item.Nome}</Text>
                                        <Text style={styles.textInfo}>{item.Posto}</Text>
                                        <Text style={styles.textInfo}>Rua das flores, nº 123 - Centro</Text>
                                        <Text style={styles.textInfo}>Marília</Text>
                                        <Text style={styles.valor}>{`R$ ${item.Valor}`}</Text>
                                    </View>
                                </View>

                                <Divisor />

                                <View style={styles.viewBtnComprar}>
                                    <TouchableOpacity style={styles.btnComprar} activeOpacity={0.7} onPress={() => {
                                        openModal(), setCombClicado(item.Nome), 
                                        setValorClicado(item.Valor), setCodigoClicado(item.Codigo), setCpnjClicado(item.CNPJ) }
                                    }>
                                        <FontAwesome 
                                            name='shopping-cart' size={20} color={theme.colors.amarelo} style={{marginRight: 5}}
                                        />
                                        <Text style={styles.textBtnComprar}>
                                            Comprar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                }
            </View>

            <Modal
                animationType='slide'
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ModalComprar 
                    close={closeModal} 
                    comb={combClicado} 
                    valor={valorClicado}
                    codigo={codigoClicado}
                    cnpj={cnpjClicado}
                />
            </Modal>
        </View>
    );
}