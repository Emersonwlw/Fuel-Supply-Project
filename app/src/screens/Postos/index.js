import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Text } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { theme } from "../../global/styles/theme";
import { styles } from './styles';

import api from "../../services/api";
import { Load } from '../../Components/Load';
import { Divisor } from "../../Components/Divisor";

export function Postos({navigation}){
    const [lista, setLista] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        listar = async () => {
            const response = await api.get('/posto/list');
            const posto = response.data.Postos;
    
            setLista(posto);
            setLoading(false);
    
            console.log('listaa => ', lista)
        } 
        listar()
    }, [])

    return(
        <View style={styles.containerPrincipal}>
            <View style={styles.viewPesquisar}>
                <TextInput
                    placeholder='Pesquisar...'
                    placeholderTextColor={theme.colors.cinza}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.btnPesquisar} activeOpacity={0.7}>
                    <FontAwesome name='search' size={22} color={theme.colors.amarelo}/>
                </TouchableOpacity>
            </View>
            
            <View style={styles.viewLista}>
                {
                    loading ?  
                    <Load />
                    :
                    <FlatList
                        style={styles.scroll}
                        data={lista}
                        keyExtractor={item => item.cnpj}
                        renderItem = { ( { item } ) =>
                            <View style={styles.containerPosto}>
                                <View style={styles.container}>
                                    <View style={styles.viewImage}>
                                        
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={styles.titulo}>{item.razaosocial}</Text>
                                        <Text style={styles.textInfo}>{item.bandeira}</Text>
                                        <Text style={styles.textInfo}>{`${item.endereco}, nº ${item.numendereco}`}</Text>
                                        <Text style={styles.textInfo}>{`Bairro ${item.bairro}`}</Text>
                                        <Text style={styles.textInfo}>{item.cidade}</Text>
                                    </View>
                                </View>
                                <Divisor />
                                <View style={styles.viewBtn}>
                                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => navigation.navigate('CombustivelPosto', { cnpjPosto: item.cnpj })}>
                                        <Text style={styles.textBtn}>
                                            Ver mais
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                }
            </View>
        </View>
    );
}