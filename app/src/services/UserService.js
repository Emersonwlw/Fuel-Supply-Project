import { create } from "apisauce";
import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import api from "./api";

class UserService extends Component {
  state = {
    userToken: false,
    nome: "",
    cpf: "",
    fone: "",
    dtnasc: Date,
    cep: "",
    endereco: "",
    numendereco: "",
    bairro: "",
    cidade: "",
    email: "",
  };

  componentDidMount() {
    this.getUsuario();
  }

  getUsuario = async () => {
    const token = this.buscaToken();

    const response = await api.get("/usuario", token);
    AsyncStorage.setItem("@FuelSupply:usuario", JSON.stringify(response));

    this.state.nome = response.data.Usuario.nome;
    this.state.cpf = response.data.Usuario.cpf;
    this.state.fone = response.data.Usuario.fone;
    this.state.dtnasc = response.data.Usuario.dtnasc;
    this.state.cep = response.data.Usuario.cep;
    this.state.endereco = response.data.Usuario.endereco;
    this.state.numendereco = response.data.Usuario.numendereco;
    this.state.bairro = response.data.Usuario.bairro;
    this.state.cidade = response.data.Usuario.cidade;
    this.state.email = response.data.Usuario.email;
    const firstName = response.data.Usuario.nome.split("")[5];

    console.log(firstName);
  };

  autenticacao = async (email, senha) => {
    try {
      const response = await api.post("/usuario/login", {
        email: email,
        senha: senha,
      });

      //no data ficam armazenadas as informações que recebemos da api
      const { nome, token } = response.data;

      //salva as informações no AsyncStorage
      await AsyncStorage.setItem("@FuelSupply:token", token);

      Promise.resolve(true);
      this.getUsuario();
      this.state.userToken = true;

      console.log("Ok - " + token);
    } catch (response) {
      Promise.resolve(false);
      this.state.userToken = false;
      Alert.alert(
        "Falha na autenticação",
        "Não foi possível realizar esta ação, verifique se os dados estão corretos."
      );

      console.log("Erro no login");
    }
  };

  buscaToken = async () => {
    await AsyncStorage.getItem("@FuelSupply:token");
  };

  listaCreditos = async () => {
    const token = this.buscaToken;
    const response = await api.get("/compracredito", token);

    console.log(response);
    return response.data;
  };

  async cadastrar(data) {
    return create({
      url: "http://api-fuelsupply.herokuapp.com/usuario/cadastro",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "aplication/json",
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async salvardados(data) {
    return create({
      url: "http://api-fuelsupply.herokuapp.com/usuario/",
      method: "PATCH",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "aplication/json",
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const userService = new UserService();

export default userService;
