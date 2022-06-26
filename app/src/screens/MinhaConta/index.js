import React, { useState, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import userService from "../../services/UserService";
import { Load } from '../../Components/Load';
import api from "../../services/api";
import { styles } from "./styles";

export function MinhaConta() {
  const [loading, setLoading] = useState(true);

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    let [dtnasc, setDtnasc] = useState(userService.state.dtnasc);
    let [endereco, setEndereco] = useState(userService.state.endereco);
    let [numendereco, setNumEndereco] = useState(userService.state.numendereco);
    let [bairro, setBairro] = useState(userService.state.bairro);
    let [cep, setCep] = useState(userService.state.cep);
    let [cidade, setCidade] = useState(userService.state.cidade);
    let [complemento, setComplemento] = useState(userService.state.complemento);
    let [fone, setFone] = useState(userService.state.fone);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
      userService.getUsuario();
      setLoading(false);
    }, []);

    salvar = async () => {
      setLoading(true)

      try {
        let response = await api.patch("/usuario/", {
          fone: fone,
          cep: cep,
          cidade: cidade,
          dtnasc: dtnasc,
          endereco: endereco,
          bairro: bairro,
          numendereco: numendereco,
          complemento: complemento,
        });

        console.log("Alterado");
        Alert.alert("Dados atualizados", 'Seus dados foram atualizados');
        userService.getUsuario();
        setLoading(false);
        console.log("Response => ", response);

        return response.data;
      } catch (error) {
        setLoading(false)
        console.log("Erro: " + error);
        Alert.alert('Não foi possível completar esta ação', 'Ocorreu um erro ao salvar suas informações. Verifique se elas estão corretas')
      }
    }; //salvar

    return (
      <ScrollView style={styles.container}>
        {
          loading ?
          <Load />
          :
          <>
            <View style={styles.viewNome}>
              <Text style={styles.nome}>{`Olá, ${userService.state.nome}`}</Text>
            </View>

            <View>
              <View style={styles.info}>
                <Text style={styles.titulo}>Nome:</Text>
                <TextInput
                  style={styles.input}
                  value={userService.state.nome}
                  setNome={userService.state.nome}
                  editable={false}
                />

              <Text style={styles.titulo}>CPF:</Text>
                <TextInput
                  style={styles.input}
                  value={userService.state.cpf}
                  setCpf={userService.state.cpf}
                  editable={false}
                />

                <Text style={styles.titulo}>Data de nascimento:</Text>
                <TextInputMask
                  type="datetime"
                  options={{
                    format: "DD/MM/YYYY",
                  }}
                  keyboardType="numeric"
                  style={styles.input}
                  value={dtnasc}
                  placeholder={userService.state.dtnasc}
                  placeholderTextColor="#000"
                  //setDtnasc={userService.state.dtnasc}
                  onChangeText={(text) => setDtnasc(text)}
                  editable={true}
                />

                <Text style={styles.titulo}>Telefone</Text>
                <TextInputMask
                  style={styles.input}
                  placeholder={userService.state.fone}
                  placeholderTextColor="#000"
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }}
                  value={fone}
                  //setFone={userService.state.fone}
                  onChangeText={(text) => setFone(text)}
                />

                <Text style={styles.titulo}>CEP:</Text>
                <TextInputMask
                  style={styles.input}
                  type="zip-code"
                  keyboardType="numeric"
                  value={cep}
                  placeholder={userService.state.cep}
                  placeholderTextColor="#000"
                  //setCep={userService.state.cep}
                  onChangeText={(text) => setCep(text)}
                  editable={true}
                />

                <Text style={styles.titulo}>Endereço:</Text>
                <TextInput
                  style={styles.input}
                  value={endereco}
                  placeholder={userService.state.endereco}
                  placeholderTextColor="#000"
                  //setEndereco={userService.state.endereco}
                  onChangeText={(text) => setEndereco(text)}
                  editable={true}
                />

                <Text style={styles.titulo}>Bairro:</Text>
                <TextInput
                  style={styles.input}
                  value={bairro}
                  placeholder={userService.state.bairro}
                  placeholderTextColor="#000"
                  onChangeText={(text) => setBairro(text)}
                  editable={true}
                />

                <Text style={styles.titulo}>Numero:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={numendereco}
                  placeholder={userService.state.numendereco}
                  placeholderTextColor="#000"
                  //setNumEndereco={userService.state.numendereco}
                  onChangeText={(text) => setNumEndereco(text)}
                  editable={true}
                />

                <Text style={styles.titulo}>Cidade:</Text>
                <TextInput
                  style={styles.input}
                  value={cidade}
                  placeholder={userService.state.cidade}
                  placeholderTextColor="#000"
                  //setCidade={userService.state.cidade}
                  onChangeText={(text) => setCidade(text)}
                  editable={true}
                />

                <Text style={styles.titulo}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={userService.state.email}
                  setEmail={userService.state.email}
                  editable={false}
                />

                {
                  loading ?
                  <Load />
                  :
                  <TouchableOpacity style={styles.viewBtn} onPress={salvar}>
                    <Text style={styles.txtBtn}>Salvar</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </>
        }
      </ScrollView>
    );
}
