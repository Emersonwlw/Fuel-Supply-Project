import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons";
import userService from "../../services/UserService";
import { theme } from "../../global/styles/theme";
import logoImg from "../../assets/logoenome.png";
import { Load } from '../../Components/Load';
import { styles } from "./styles";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostraSenha, setMostraSenha] = useState(true);
  const [loading, setLoading] = useState(null);

  const state = {
    loginUser: null,
    errorMessage: null,
  };

  const validar = () => {
    let error = false;

    const validaEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!validaEmail.test(String(email).toLowerCase())) {
      Alert.alert("OPS !", "É necessário informar um email válido.");
      error = true;
      setLoading(false);
    }
    if (senha == null) {
      Alert.alert("OPS !", "Verifique se a senha foi preenchida corretamente.");
      error = true;
      setLoading(false);
    }

    return !error;
  };

  const entrar = async () => {
    setLoading(true);

    if (validar()) {
      await userService.autenticacao(email, senha);
      setLoading(false);
      
      if (userService.state.userToken == true) {
        console.log("Resultado = " + userService.state.userToken);
        navigation.reset({
          index: 0,
          routes: [{ name: "PostosdeCombustivel" }],
        });
      }
    } else {
      console.log("falhou");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewImg}>
        <Image source={logoImg} style={styles.img} resizeMode="stretch" />
      </View>

      <View style={styles.login}>
        <Text style={styles.titulo}>Bem-vindo(a)</Text>
        <Text style={styles.subtitulo}>Faça login para ter acesso:</Text>

        <KeyboardAvoidingView>
          <View style={styles.viewInput}>
            <Icon
              name="person"
              size={23}
              color={theme.colors.cinza}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email..."
              autoCorrect={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={theme.colors.cinza}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.viewInput}>
            <Icon
              name="lock"
              size={23}
              color={theme.colors.cinza}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha..."
              autoCorrect={false}
              autoCapitalize="none"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              placeholderTextColor={theme.colors.cinza}
              secureTextEntry={mostraSenha}
            />
            <TouchableOpacity
              style={styles.iconEye}
              onPress={() => setMostraSenha(!mostraSenha)}
            >
              {mostraSenha ? (
                <FontAwesome name="eye" size={20} color={theme.colors.cinza} />
              ) : (
                <FontAwesome
                  name="eye-slash"
                  size={20}
                  color={theme.colors.cinza}
                />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.containerSenha}>
            { /*
            <TouchableOpacity style={styles.btnSenha}>
              <Text style={styles.txtSenha}>Esqueci a senha</Text>
            </TouchableOpacity>
            */}
          </View>

          {
            loading ?
            <Load />
            :
            <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={entrar}>
              <Text style={styles.text}>ACESSAR</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity
            style={styles.btnCad}
            onPress={() => navigation.navigate("Cadastrar")}
          >
            <Text style={styles.txtCad}>Cadastre-se</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
