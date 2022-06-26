import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Divisor } from '../../Components/Divisor';
import { theme } from '../../global/styles/theme';
import { CheckBox } from 'react-native-elements';
import { Load } from '../../Components/Load';
import api from '../../services/api';
import { styles } from './styles';

 
export function CreditosPosto({navigation,route}){
    const [lista, setLista] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selCombustivel, setSelCombustivel] = useState('');
    const [isSelected, setIsSelection] = useState([]);
    const cnpjposto = route.params.cnpjPosto;

    let listar = async () => {
        const token = await AsyncStorage.getItem('@FuelSupply:token');
        let combustivel = `%${selCombustivel}%`;
        const cnpj = route.params.cnpjPosto
        const response = await api.post('/compracredito/list/creditof', { token, cnpj, combustivel } );
        const credito = response.data.compracredito;

        setLista(credito);
        setLoading(false);

        console.log('Créditos => ', lista)
    } 

    useEffect(() => {
        listar()
    }, [selCombustivel])

    verificaSelecao = () => {
        setLoading(true)

        if(isSelected.length === 0){
            Alert.alert('Nenhum crédito selecionado', 'Para prosseguir, é necessário que pelo menos um crédito seja selecionado')
            setLoading(false)
        }
        else{
            setLoading(false)
            navigation.navigate('UtilizarCredito', { codigos: isSelected, cnpj: cnpjposto })
        }
    }
  
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: theme.colors.branco, marginHorizontal: '3%', padding: '3%', 
                marginVertical: '4%', borderRadius: 6 }}
            >
                <Picker
                    selectedValue={selCombustivel}
                    onValueChange={(itemValue) => {setSelCombustivel(itemValue)}}
                    style={{ height: Platform.OS === 'android' ? 25 : 60, color: theme.colors.cinzaescuro, 
                            fontFamily: theme.fonts.mon_semibold
                    }}
                    itemStyle={{ height: 60 }}
                >
                    <Picker.Item label='Todos' value='' />
                    <Picker.Item label='Álcool' value='Alcool' />
                    <Picker.Item label='Diesel' value='Diesel' />
                    <Picker.Item label='Etanol' value='Etanol' />
                    <Picker.Item label='Gás' value='Gas' />
                    <Picker.Item label='Gasolina' value='Gasolina' />
                </Picker>
            </View>
            
            {
                loading ? 
                <Load />
                :
                <FlatList
                    data={lista}
                    keyExtractor={item => item.codigo.toString()}
                    extraData={isSelected}
                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ color: theme.colors.cinzaescuro, fontFamily: theme.fonts.mon_regular }}>
                                Você não possui créditos deste combustivel
                            </Text>
                        </View>
                    }
                    renderItem = { ( { item } ) =>
                        <View style={styles.containerCredito}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.txtTitulo}>{`R$ ${item.valortotal} em créditos`}</Text>
                                <CheckBox 
                                    checkedColor={theme.colors.vermelho}
                                    checked={isSelected.includes(item.codigo)}
                                    onPress={() => {
                                        const newIds = [...isSelected];
                                        const index = newIds.indexOf(item.codigo);
                                        
                                        if(index > -1){
                                            newIds.splice(index, 1);
                                        }
                                        else{
                                            newIds.push(item.codigo);
                                            
                                        }
                                        setIsSelection(newIds);
                                        console.log('ids: ', isSelected)
                                    }}
                                />
                            </View>

                            <Divisor />

                            <Text style={[styles.txtInfo, styles.br]}>
                                {item.nomecomb} - 
                                <Text style={styles.txtInfo, {color: theme.colors.azul}}>{` ${item.litros} litros`}</Text>
                            </Text>
                            <Text style={styles.txtInfo}>
                                Data da compra: 
                                <Text style={styles.txtInfo, {color: theme.colors.azul}}>{` ${item.data}`}</Text>
                            </Text>
                            <Text style={styles.txtInfo}>
                                Preço pago (litro): 
                                <Text style={styles.txtInfo, {color: theme.colors.azul}}>{` R$ ${item.valorcombustivel}`}</Text>
                            </Text>
                            <Text style={{ color: theme.colors.verde, marginTop: '7%', fontFamily: theme.fonts.mon_semibold, fontSize: 15 }}>
                                Disponível
                            </Text>
                        </View>
                    }
                />
            }
            <TouchableOpacity 
                style={styles.btnUtilizar} 
                onPress={() => verificaSelecao()}
            >
                <Text style={styles.txtBtn}>
                    Utilizar crédito(s)
                </Text>
            </TouchableOpacity>
        </View>
    );
}