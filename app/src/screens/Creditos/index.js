import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Divisor } from "../../Components/Divisor";
import { theme } from "../../global/styles/theme";
import { Load } from '../../Components/Load';
import api from "../../services/api";
import { styles } from './styles';

export function Creditos({navigation}){
    const [lista, setLista] = useState(null)
    const [loading, setLoading] = useState(true)

    listar = async () => {
        const token = await AsyncStorage.getItem('@FuelSupply:token');
        const response = await api.post('/compracredito/list/carteira', {token});
        const carteira = response.data.compracredito;
        
        setLista(carteira)
        setLoading(false)

        console.log('Carteira: ', carteira)
    } 

    useEffect(() => {
        listar()
    }, [])

    return(
        <View style={styles.containerPrincipal}>
            <View style={styles.viewFiltrar}>
                <View style={styles.viewBtnFiltrar}>
                    <TouchableOpacity style={styles.btnFiltrar} activeOpacity={0.7}>
                        <Text style={styles.textBtnFiltrar}>
                            Filtrar
                        </Text>
                        <FontAwesome 
                            name='align-center' size={22} color={theme.colors.amarelo} style={{marginLeft: 15}}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {
                loading ?
                <Load />
                :
                <FlatList 
                    data={lista}
                    keyExtractor={item => item.cnpj}
                    renderItem = { ( { item } )  =>
                        <View style={styles.containerPosto}>
                            <View style={styles.container}>
                                <View style={styles.viewImage}></View>

                                <View style={styles.info}>
                                    <Text style={styles.titulo}>{item.posto}</Text>
                                    <Text style={styles.textInfo}>{`${item.endereco}, nº ${item.numendereco}`}</Text>
                                    <Text style={{ fontSize: 16, fontFamily: theme.fonts.mon_regular, color: theme.colors.cinza, marginTop: 2 }}>
                                        {`${item.litroscarteira} litros no total`}
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: theme.fonts.mon_semibold, color: theme.colors.verde, marginTop: 2 }}>
                                        {`R$${item.valorcarteira} em créditos`}
                                    </Text>
                                </View>
                            </View>
                            <Divisor />
                            <View style={styles.viewBtn}>
                                <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => navigation.navigate('CreditosPosto', { cnpjPosto: item.cnpj })}>
                                    <Text style={styles.textBtn}>
                                        Ver mais
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontFamily: theme.fonts.mon_regular, color: theme.colors.cinzaescuro }}>
                                Sua carteira esta vazia
                            </Text>
                        </View>
                    }
                />
            }
        </View>
    );
}