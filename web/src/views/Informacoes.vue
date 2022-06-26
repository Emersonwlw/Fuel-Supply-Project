<template>
    <!DOCTYPE html>
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Fuel Supply - Informações</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet">   
            
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap" rel="stylesheet">        
        </head>

        <body class="containertela">
            <Navbar />

            <div class="container">
                <div class="divtitulo">
                    <h1 class="titulo">Informações</h1>
                </div>

                <form id="formposto">
                    <div class="fullbox">
                        <input type="textarea" name="razaosocial" class="inputunico" style="width: 100%" 
                            v-model="posto.razaosocial" placeholder="Razão social..." disabled
                        >
                    </div>
                    <div class="halfbox">
                        <input type="textarea" name="cnpj" class="inputunico" style="width: 49%" v-model="posto.cnpj" 
                            placeholder="CNPJ..." disabled
                        >
                        <input type="textarea" name="ie" class="inputunico spacing" style="width: 49%" v-model="posto.ie" 
                            placeholder="Inscrição Estadual (IE)..." disabled
                        >
                    </div>
                    <div class="fullbox">
                        <input type="textarea" name="endereco" class="inputunico" style="width: 100%" v-model="posto.endereco" 
                            placeholder="Endereço..."
                        >
                    </div>
                    <div class="halfbox">
                        <input type="textarea" name="numero" class="inputunico" style="width: 49%" v-model="posto.numendereco" 
                            placeholder="Número..."
                        >
                        <input type="textarea" name="bairro" class="inputunico spacing" style="width: 49%" v-model="posto.bairro" 
                            placeholder="Bairro..."
                        >
                    </div>
                    <div class="halfbox">
                        <input type="textarea" name="cep" class="inputunico" style="width: 49%" v-model="posto.cep" placeholder="CEP...">
                        <input type="textarea" name="cidade" class="inputunico spacing" style="width: 49%" v-model="posto.cidade" 
                            placeholder="Cidade"
                        >
                    </div>
                    <div class="halfbox">
                        <input type="textarea" name="bandeira" class="inputunico" style="width: 49%" v-model="posto.bandeira" 
                            placeholder="Bandeira..."
                        >              
                        <!-- <select class="inputunico " v-model="posto.bandeira" >
                            <option>  </option>
                            <option>Branca</option>
                            <option>Ipiranga</option>
                            <option>Shell</option>
                            <option>Ale</option>
                            <option>Petrobrás</option>
                        </select>
         
                        <select class="inputunico" v-model="posto.tipo">
                            <option>  </option>
                            <option>Revendedor</option>
                            <option>Abastecimento</option>
                            <option>Escola</option>
                            <option>GNV</option>
                            <option>Flutuante</option>
                            <option>Aviação</option>
                            <option>Marítimo</option>
                        </select> -->
                
                        <input type="textarea" name="tipo" class="inputunico spacing" style="width: 49%" v-model="posto.tipo" 
                            placeholder="Tipo de posto..."
                        >
                    </div>
                    <div class="halfbox">
                        <input type="textarea" name="telefone" class="inputunico" style="width: 49%" v-model="posto.fone" 
                            placeholder="Telefone..."
                        >
                        
                    </div>
                    <div class="fullbox">
                        <input type="textarea" name="email" class="inputunico" style="width: 100%" v-model="posto.email" placeholder="Email..." disabled/>
                    </div>
                    <div class="halfbox">
                        <!-- <input type="textarea" name="senha" class="inputunico" style="width: 49%" v-model="posto.senha" placeholder="Senha..." disabled> -->
                      
                        <button @click.prevent="altinformacoes" class="btnEditar"><i class="material-icons iconbtn">create</i>Salvar</button>
                    </div>
                </form>
            </div>
        </body>
    </html>
</template>

<script>
    import Navbar from '../components/Navbar.vue';

    export default{
        components:{
            Navbar
        },

        name: "app",

        data(){
            return{
                posto: {
                    
                    "cnpj": "",
                    "razaosocial": "",
                    "endereco": "",
                    "bairro": "",
                    "cidade": "",
                    "cep": "",
                    "numendereco": "",
                    "fone": "",
                    "ie": "",
                    "bandeira": "",
                    "tipo": "",
                    "email": ""

                },
                error: []
            }
        },

        mounted(){
            this.informacoesposto();
        },

        methods: {
            informacoesposto(){
                this.$store.dispatch("infoposto").then(Response => {
                    this.posto = Response.data.Posto;
                    console.log('posto = ', this.posto)
                })
            },
            altinformacoes(){
                this.$store.dispatch("altinfoposto", this.posto).then(Response => {
                    this.posto = {}
                    alert("Atualizado com sucesso");
                    this.informacoesposto();
                    console.log('Posto == ', Response);
                })
                .catch(e => {
                    console.log("Erro ao atualizar => ", Response.error);
                    this.error = e.Response.data.error;
                    alert("Ocorreu um erro ao atualizar cadastro. Verifique se todos os campos estão preenchidos corretamente !");
                })
            }
        }
    }
</script>

<style scoped>
    .containertela{
        background-color: #E5E5E5;
        height: 100% ; 
    }
    .container{
        background-color: #FFF;
        width: 100%;
        height: 100% ;
        margin-top: 10px;
        border-radius: 20px;
        padding: 20px;
    }
    .divtitulo{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 10px;
    }
    .titulo{
        color: #FB6107;
        font-size: 36px;
        font-family: 'Montserrat', sans-serif;
    }
    #formposto{
        height: 90%;
        width: 100%;
        padding: 20px;
    }
    .inputunico{
        border: 1px solid #313638;
        padding: 10px;
        border-radius: 8px;
        resize: none;
        overflow: auto;
        white-space: nowrap;
        outline: none;
    }
    .fullbox{
        position: relative;
        flex: 1 1 100%;
        margin-bottom: 18px;
    }
    .halfbox{
        position: relative;
        flex: 1 1 45%;
        margin-bottom: 18px;
    }
    .spacing{
        margin-left: 1.9%;
    }
    .btnEditar {
        background-color: #F9C846;
        height: 46px  !important;
        width: 250px  !important;
        color: #FFF  !important;
        border: transparent  !important; 
        border-radius: 5px  !important;
        font-size: 26px  !important;
        font-family: 'Rajdhani', sans-serif  !important;
        margin-left: 39vw !important;
        justify-content: center  !important;
        align-items: center  !important;
        padding: 5px  !important;
    }
    .iconbtn{
        margin-right: 4%;
    }
    .fullbox{
        position: relative;
        flex: 1 1 100%;
        margin-bottom: 18px;
    }
    .halfbox{
        position: relative;
        flex: 1 1 45%;
        margin-bottom: 18px;
    }
    .spacing{
        margin-left: 2%;
    }
    .btnEditar{
        background-color: #F9C846;
        height: 46px;
        width: 230px;
        color: #FFF;
        border: transparent;
        border-radius: 5px;
        font-size: 26px;
        font-family: 'Rajdhani', sans-serif;
        margin-left: 23vw;
        justify-content: center;
        align-items: center;
        padding: 5px;
    }
    .iconbtn{
        margin-right: 4%;
    }


    /* teste */

    /* ts */
</style>