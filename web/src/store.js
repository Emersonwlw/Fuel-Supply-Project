import Vue from "vue";
import Vuex from "vuex";
import api from "./services/index";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    Posto: {
      cnpj: "",
      razaosocial: "",
    },
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_Posto(state, payload) {
      state.Posto = Object.assign(state.Posto, payload);
    },
  },
  actions: {
    getPosto(context) {
      api.get(`/Posto`).then((response) => {
        context.commit("UPDATE_Posto", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    Logarusuario(context, payload) {
      return api
        .login({
          email: payload.email,
          senha: payload.senha,
        })
        .then((response) => {
          window.localStorage.token = `Bearer ${response.data.token}`;
          console.log(response.data.token);
        });
    },
    gravarcadastro: (context, cadastro) => {
      return api.post("posto/cadastro", cadastro);
    },

    gravarcombustivel: (context, combustivel) => {
      return api.post("combustivel", combustivel);
    },

    listarcombustivel: () => {
      return api.get("combustivel");
    },

    listarvendas: () => {
      return api.get("posto/list/vendas");
    },

    atualizarcombustivel: (context, combustivel) => {
      return api.patch("combustivel", combustivel);
    },

    apagarcombustivel: (context, combustivel) => {
      return api.patch("combustivel/del", combustivel);
    },

    listacheckout: (context, Uso) => {
      return api.post("caixauso/list/uso/posto", Uso);
    },

    updatecheckposto: (context, caixauso) =>{
      return api.patch("caixauso/alter/posto", caixauso);
    },
    infoposto: () => {
      return api.get("posto/");
    },

    altinfoposto: (context, posto) => {
      return api.patch("posto/", posto);
    },

    updatecaixausocredito: (context, array)=>{
      return api.patch("caixausocredito/alter/posto", array);
    },

    deslogaposto(context) {
      context.commit("UPDATE_Posto", {
        cnpj: "",
        Nome: "",
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
  },
});
