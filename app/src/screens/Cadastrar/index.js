import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Load } from '../../Components/Load';
import api from "../../services/api";
import { styles } from './styles';

export function Cadastrar({navigation}){
    const [loading, setLoading] = useState(null);

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dtnasc, setDtnasc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numendereco, setNumEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [fone, setFone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    cadastrar = async () => {
        setLoading(true);

        if(verificaCampos()){
            try{
                const response = await api.post('/usuario/cadastro', { 
                    cpf: cpf, 
                    nome: nome,
                    fone: fone, 
                    cep: cep,
                    cidade: cidade,
                    email: email,
                    dtnasc: dtnasc, 
                    endereco: endereco,
                    bairro: bairro,
                    numendereco: numendereco,
                    complemento: complemento,
                    senha: senha });
                console.log("Cadastro realizado");
                Alert.alert('Cadastro realizado', 'Seus dados foram salvos com sucesso. Aproveite o nosso app !');
                navigation.goBack();
                setLoading(false);

                return response.data;
            }
            catch(error){
                setLoading(false);
                console.log("Erro: " + error);
            } 
        }
        else{
            Alert.alert('Ocorreu um erro inesperado', 'Não foi possível realizar seu cadastro. Verifique se as informações estão corretas')
        }   
    }

    verificaCampos = () => {
        if(cpf === '' || nome === '' || fone === '' || cep === '' || cidade === '' || endereco === '' || bairro === ''
            || numendereco === '' || complemento === '' || senha === '' 
        ){
            Alert.alert('Falha no cadastro', 'Verifique se todos os campos foram preenchidos e tente novamente');
            setLoading(false);
            return false;
        }
        return true;
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.margem}/>

            <View style={styles.cadastrar}>
                <Text style={styles.titulo}>Cadastre-se</Text>
                <Text style={styles.subtitulo}>Preencha todos os campos</Text>

                <ScrollView>
                    <TextInput 
                        placeholder='Nome completo...'
                        style={styles.input}
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                    <TextInputMask 
                        style={styles.input}
                        type='cpf'
                        keyboardType='numeric'
                        placeholder='CPF...'
                        value={cpf}
                        onChangeText={(text) => setCpf(text)}
                    />
                    <TextInputMask 
                        style={styles.input}
                        type='datetime'
                        options={{
                            format:'DD/MM/YYYY'
                        }}
                        keyboardType='numeric'
                        placeholder='Data de nascimento...'
                        value={dtnasc}
                        onChangeText={(text) => setDtnasc(text)}
                    />
                    <TextInput
                        placeholder='Endereço...'
                        style={styles.input}
                        value={endereco}
                        onChangeText={(text) => setEndereco(text)}
                    />
                    <TextInput
                        placeholder='Número...'
                        keyboardType='numeric'
                        style={styles.input}
                        value={numendereco}
                        onChangeText={(text) => setNumEndereco(text)}
                    />
                    <TextInput
                        placeholder='Bairro...'
                        style={styles.input}
                        value={bairro}
                        onChangeText={(text) => setBairro(text)}
                    />
                    <TextInput
                        placeholder='Complemento...'
                        style={styles.input}
                        value={complemento}
                        onChangeText={(text) => setComplemento(text)}
                    />
                    <TextInputMask
                        style={styles.input}
                        placeholder='Telefone...'
                        type={"cel-phone"}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={fone}
                        onChangeText={(text) => setFone(text)}
                    />
                    <TextInputMask 
                        style={styles.input}
                        type='zip-code'
                        keyboardType='numeric'
                        placeholder='CEP...'
                        value={cep}
                        onChangeText={(text) => setCep(text)}
                    />
                    <TextInput 
                        placeholder='Cidade...'
                        style={styles.input}
                        value={cidade}
                        onChangeText={(text) => setCidade(text)}
                    />
                    <TextInput 
                        placeholder='Email...'
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput 
                        placeholder='Senha...'
                        style={styles.input}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />

                    <View style={styles.btn}>
                        {
                            loading ?
                            <Load />
                            :
                            <TouchableOpacity style={styles.btnCadastro} activeOpacity={0.7} onPress={() => cadastrar()}>
                                <Text style={styles.text}>
                                    CADASTRAR
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}