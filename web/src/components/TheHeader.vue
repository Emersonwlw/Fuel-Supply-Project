<template>
  <header>
    <nav>
       <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="FuelSupply">
      </router-link>
        <button v-if="$store.state.login == true" class="btn" @click="deslogar">Deslogar</button> 
        <button v-else class="btn" @click="deslogar" >←</button>  
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    }
  },
  methods: {
    deslogar() {
      this.$store.dispatch("deslogaposto");
      this.$router.push("/");
    }
  }
 
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  height: 99px;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px #cc6607;
  background-color: #292929;
}
.btn {
  display: block;
  margin-left: auto;
   
  padding: 10px 30px;
  background-color: #cc6607;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}
.logo {
  padding: 10px 0px;
  
}

.logo img {
  width: 80px;
}

.halfBox3{
    flex: 1 1 1 33%;
    position: relative;
}
</style>
