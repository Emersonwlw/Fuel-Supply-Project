import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import { ModalComprar } from '../../Components/ModalComprar';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../global/styles/theme';
import { Load } from '../../Components/Load';
import api from '../../services/api';
import { styles } from './styles';

export function CombustivelPosto({route}){
    const [lista, setLista] = useState(null)
    const [loading, setLoading] = useState(true)

    const [nomePosto, setNomePosto] = useState(null)
    const [bandeira, setBandeira] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [numEndereco, setNumEndereco] = useState(null)
    const [bairro, setBairro] = useState(null)
    const [cidade, setCidade] = useState(null)
    const [fone, setFone] = useState(null)

    const [modalVisible, setModalVisible] = useState(false)
    const [combClicado, setCombClicado] = useState(null)
    const [valorClicado, setValorClicado] = useState(null)
    const [codigoClicado, setCodigoClicado] = useState(null)
    const [cnpjClicado, setCpnjClicado] = useState(null)

    function openModal(){
        setModalVisible(true)
    }

    function closeModal(){
        setModalVisible(false)
    }

    useEffect(() => {
        listar = async () => {
            const cnpj = route.params.cnpjPosto
            const response = await api.post('posto/list/posto/comb', { cnpj })
            const combs = response.data.Postos
            const posto = response.data.posto

            setLoading(false)

            setLista(combs)
            setNomePosto(posto.razaosocial)
            setEndereco(posto.endereco)
            setNumEndereco(posto.numendereco)
            setBairro(posto.bairro)
            setCidade(posto.cidade)
            setBandeira(posto.bandeira)
            setFone(posto.fone)

            console.log('Combs => ', posto)

            setCpnjClicado(cnpj)
        } 
        listar()
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.infoPosto}>
                {
                    loading ? 
                    <Load />
                    :
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewImg}>

                            </View>
                            <View>
                                <Text style={{ color: theme.colors.laranja, fontFamily: theme.fonts.mon_semibold, fontSize: 18, marginBottom: 5 }}>
                                        {nomePosto}
                                </Text>
                                <Text style={styles.textPosto}>
                                    {`Bandeira ${bandeira}`}
                                </Text> 
                                <Text style={styles.textPosto}>
                                    {`${endereco}, ${numEndereco}`}
                                </Text>
                                <Text style={styles.textPosto}>
                                    {`Bairro ${bairro}`}
                                </Text>
                                <Text style={styles.textPosto}>
                                    {cidade}
                                </Text>
                            </View>
                        </View>
                        <Text 
                            style={{padding: 10, color: theme.colors.azul, fontFamily: theme.fonts.mon_regular, fontSize: 15}}
                            onPress={() => {Linking.openURL(`tel:${fone}`)}}
                        >
                            {fone}
                        </Text>
                    </>
                }
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ color: theme.colors.preto, fontFamily: theme.fonts.mon_semibold, fontSize: 20, marginBottom: 10 }}>
                    Combustíveis / Preço
                </Text>
                {
                    loading ?
                    <Load />
                    :
                    <FlatList
                        data={lista}
                        keyExtractor={item => item.codigo.toString()}
                        renderItem = { ( { item } ) =>
                            <TouchableOpacity style={styles.containerComb} activeOpacity={0.8} 
                                onPress={() => {openModal(), setCombClicado(item.nome), 
                                                setValorClicado(item.valor), setCodigoClicado(item.codigo)
                                            }
                                        }
                            >
                                <Text style={styles.nomeComb}>{item.nome}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.valorComb}>{`R$ ${item.valor}`}</Text>
                                    <FontAwesome5 name='cart-plus' style={styles.valorComb} />
                                </View>
                            </TouchableOpacity>
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