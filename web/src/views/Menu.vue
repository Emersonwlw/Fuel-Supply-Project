<template>
    <html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fuel Supply - Página Inicial</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css">
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"> 

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Rajdhani:wght@700&display=swap" rel="stylesheet">
    </head>
       
    <body class="containertela">
        <Navbar />

        <div class="containermenu">
            <div class="divmenutitulo">
                <h2 class="titulomenu">MENU POSTO</h2>
            </div> 
            
            <br>

            <div class="divmenu">
                <div class="divcardsmenu margincards" style="float: left">
                    <i class="material-icons iconsmenu">chat_bubble</i>
                    <br><br>
                    <label class="textopcao">VISUALIZAR E/OU EDITAR INFO</label>
                    <div class="btnopcaomenu">
                        <router-link to="/informacoes" class="textbtnmenu" style="text-decoration: none">INFORMAÇÕES</router-link>
                    </div>
                </div>

                <div class="divcardsmenu margincards" style="float: left">
                    <i class="material-icons iconsmenu">flash_on</i>
                    <br><br>
                    <label class="textopcao">VISUALIZAR E/OU EDITAR COMB.</label>
                    <div class="btnopcaomenu">
                        <router-link to="/combustivel" class="textbtnmenu" style="text-decoration: none">COMBUSTÍVEIS</router-link>
                    </div>
                </div>

                <div class="divcardsmenu margincards" style="float: left">
                    <i class="material-icons iconsmenu">play_circle_filled</i>
                    <br><br>
                    <label class="textopcao" style="margin-left: 25%">CHECKOUT <br> DA VENDA</label>
                    <div class="btnopcaomenu">
                        <router-link to="/checkout" class="textbtnmenu" style="text-decoration: none">CHECKOUT</router-link>
                    </div>
                </div>

                <div class="divcardsmenu margincards" style="float: left">
                    <i class="material-icons iconsmenu">work</i>
                    <br><br>
                    <label class="textopcao" style="margin-left: 25%">VISUALIZAR <br> VENDAS</label>
                    <div class="btnopcaomenu">
                        <router-link to="/vendas" class="textbtnmenu" style="text-decoration: none">VENDAS</router-link>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

</template>

<script>
    import Navbar from '../components/Navbar.vue';
    //import Footer from '../components/TheFooter.vue';

    export default{
        components:{
            Navbar
        }
    }
</script>

<style scoped>
    .containertela{
        background-color: #E5E5E5;
    }
    .containermenu{
        background-color: #E5E5E5;
        width: 100%;
        height: 100%;
    }
    .divmenutitulo{
        background-color: #FB6107;
        padding: 10px;
        margin-top: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .titulomenu{
        color: #FFF;
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
        font-size: 26px;
    }
    .divmenu{
        background-color: #FFF;
        border-top: 1px solid #F9C846;
        border-bottom: 1px solid #F9C846;
        padding: 20px;
        position: absolute;
        width: 100%;
    }
    .divcardsmenu{
        border-radius: 15px;
        width: 291px;
        height: 355px;
        border: 1px solid #F9C846;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        background-color: #F5F7FB;
    }
    .diviconmenu{
        align-items: center;
        justify-content: center;
        display: flex;
        margin-top: 30px;
    }
    .iconsmenu{
        vertical-align: top;
        color: #313638;
        font-size: 62px;
        margin-left: 40%;
        margin-top: 10%;
    }
    .textopcao{
       font-size: 24px;
       font-family: 'Montserrat', sans-serif;
       color: #313638;
       text-align: center;
       margin-top: 15%;
       margin-bottom: 27%;
    }
    .btnopcaomenu{
        height: 50px;
        width: 291px;
        border-radius: 15px;
        border-color: transparent;
        background-color: #F9C846;
        justify-content: center;
        align-items: center;
        font-family: 'Rajdhani', sans-serif;
        display: flex;
    }
    .textbtnmenu{
        color: #FFF;
        font-size: 26px;
    }
    .margincards{
        margin-left: 2.5%;
    }
</style>