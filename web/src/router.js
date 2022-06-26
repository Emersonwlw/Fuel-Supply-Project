import Vue from "vue";
import Router from "vue-router";
import Combustivel from "./views/Combustivel.vue"
import Login from "./views/Login.vue"
import Menu from "./views/Menu.vue"
import Cadastro from "./views/Cadastro.vue"
import Vendas from  "./views/Vendas.vue"
import Informacoes from "./views/Informacoes.vue"
import Checkout from "./views/checkout.vue"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

    {
      path: "/",
      name: "Login",
      component: Login
    },

    {
      path: "/combustivel",
      name: "combustivel",
      component: Combustivel,
      meta: {
        login: true,
      }
    },
    
    {
      path: "/menu",
      name: "menu",
      component: Menu,
      meta: {
        login: true,
      }
    },

    {
      path: "/cadastro",
      name: "cadastro",
      component: Cadastro
    },
    {
      path: "/vendas",
      name: "vendas",
      component: Vendas,
      meta: {
        login: true,
      }
    },
    {
      path: "/informacoes",
      name: "informacoes",
      component: Informacoes,
      meta: {
        login: true
      }
    },

    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
      meta: {
        login: true
      }
    }
   
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});


router.beforeEach((to, from, next) =>{

  if(to.matched.some(record => record.meta.login)){
    if(!window.localStorage.token){
      next("/");
    }else{
      next();
    }
 }else{
   next();
 }

})


export default router