<template>
    <header>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap" rel="stylesheet">
        <nav>
            <router-link class="divImg" to="/menu">
                <img src="@/assets/icon.png" alt="Fuel Supply"  height="40" width="40">
            </router-link>
            <div class="divPaginas">
                <router-link class="marginMenu" to="/menu">Página Inicial</router-link>
                <router-link class="marginMenu" to="/informacoes">Informações</router-link>
                <router-link class="marginMenu" to="/combustivel">Combustíveis</router-link>
                <router-link class="marginMenu" to="/checkout">Checkout</router-link>
                <router-link class="marginMenu" to="/vendas">Vendas</router-link>
                <a class="marginMenu" @click="deslogar">Sair</a>
            </div>
        
                    
        </nav>
      
    </header>
</template>

<script>
    export default {
        name: "Navbar",
        methods: {
            deslogar() {
                this.$store.dispatch("deslogaposto");
                this.$router.push("/");
            }
        }
    };
</script>

<style scoped>
    
    nav{
        background-color: #313638;
        display: flex;
        justify-content: space-between;
       width: 100%;
       align-items: center;
       
    }
    .divImg{
        margin-left: 20px;
        color: #B6B9B8;
        display: flex;
    }
    .divPaginas{
        
        display: flex;
        justify-content: space-between;
        margin-right: 55px;
        cursor: pointer;
         
    }
    .divSair{
        display: flex;
        

    }
    .marginMenu{
        display: flex;
        margin-left: 33px;
        color: #B6B9B8;
        text-decoration: none;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1.5rem;
 
    }
    .teste{
        color: brown;

    }
</style>