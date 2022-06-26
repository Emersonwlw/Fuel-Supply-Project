<template>
    <!DOCTYPE html> 
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Fuel Supply - Login</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css">
            <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap" rel="stylesheet">
        </head>
        <body class="containertelalogin">
            <div id = "esquerda">
                <img src="../assets/logoenome.png" class="logologin">
            </div>
            <div id="direita">
                <h2 class="corTextLogin">Login</h2>
                <form class="formlogin">
                    <div class="divinputlogin">
                        <i class="material-icons diviconlogin">perm_identity</i>
                        <input type="email" class="bloco" name="email" id="email" v-model="login.email" placeholder="Email..." autocomplete="off" maxlength="80">
                    </div>
                    <div class="divinputlogin">
                        <i class="material-icons diviconlogin">lock</i>
                        <input type="password" class="bloco" name="senha" id="senha" v-model="login.senha" placeholder="Senha..." maxlength="8" autocomplete="off">
                        <button class="btnmostrasenha" ><i class="material-icons diviconlogin">visibility</i></button>
                    </div>
                    <button type="submit" class="bloco btnLogin" @click.prevent="logar">ACESSAR</button>
                </form>
                <div id="cadastrar-containerlogin">
                    <label class="corText">Ainda não possui uma conta?</label>
                    <router-link class="corLaranja" to="/cadastro">Cadastrar-se</router-link>
                </div>
            </div>
        </body>
    </html>
</template>

<script>
export default {
    data(){
      return{
        login: {
          email: "",
          senha: "",
        }
      };
    },
    methods: {
      logar(){
          this.$store.dispatch("Logarusuario", this.login).then(response =>{
              console.log(response);
              this.$store.dispatch("getPosto");
              this.$router.push("/menu");

          }).catch(error =>{
                 alert("Falha de autenticação " + error)
             })
      }

    }
  }; 

 document.addEventListener("DOMContentLoaded", function(){
    // EXIBIR SENHA
    let btnMostrarSenha = document.querySelector('.lnr-eye');

    btnMostrarSenha.addEventListener('click', function() {
        let input = document.querySelector('#senha');
        
        if(input.getAttribute('type') == 'password') {
            input.setAttribute('type', 'text');
        } 
        else {
            input.setAttribute('type', 'password');
        }
    });
});


</script>

<style>
    .containertelalogin{
        background: rgb(132,138,136);
        background: linear-gradient(180deg, rgba(132,138,136,1) 0%, rgba(229,229,229,1) 100%);
        height: 100vh;
        padding: 3%;
        display: flex;
        justify-content: center;
    }
    #direita{
        height: 85vh;
        width: 40vw;
        float: left;
        background-color: #FFF;
        align-items: center;
        justify-content: center;
    }
    #esquerda{
        height: 85vh;
        width: 40vw;
        background-color: #313638;
        float: left;
        align-items: center; 
        justify-content: center;
        display: flex;
    }
    .logologin{
        height: 35%;
        width: 30%;
    }
    .corTextLogin{
        color: #FB6107;
        display: flex;
        justify-content: center;
        margin-top: 20%;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
    }
    .formlogin{
        margin-top: 8%;
        padding-left: 15%;
        padding-right: 15%;
    }
    .diviconlogin{
        float: left;
        position: relative;
        color: #313638;
        font-size: 24px;
        opacity: 47%;
        margin-right: 2px;
    }
    .divinputlogin{
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 8px;
        padding-right: 10px;
    }
    .bloco{
        width: 100%;    
    }
    .btnmostrasenha{
        outline: none;
        border: none;
        background-color: transparent;
    }
    .lnr-eye {
        float: left;
        position: relative;
        color: #313638;
        font-size: 24px;
        opacity: 47%;
        margin-right: 2px;
    }
    .btnLogin{
        text-align: center;
        border: none;
        height: 40px;
        border-radius: 18px;
        margin-top: 30px;
        color: #FFF;
        background-color: #F9C846;
        cursor: pointer;
        font-size: 1.5rem;
        font-family: 'Rajdhani', sans-serif;
        margin-top: 15%;
    }
    #cadastrar-containerlogin{
        align-items: center;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        margin-top: 8%;
    }
    .corText{
        color: #313638;
        font-family: 'Montserrat', sans-serif;
        font-size: 15px;
        display: flex;
        justify-content: center;
    }
    .corLaranja{
        color: #FB6107;
        font-family: 'Rajdhani', sans-serif;
        display: flex;
        justify-content: center;
        font-size: 20px;
        margin-top: 2px;
    }

/* CSS TELA DE LOGIN */

#forgot-pass{
    text-align: right;
    display: block;
}
input[type="submit"]:hover{
    background-color: #d58300;
}
</style>

