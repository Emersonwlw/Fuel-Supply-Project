<template>
   <!DOCTYPE html>
     
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      
        </head>      
        <body>
            <Navbar />

            <div class="container">
               
                

               <div class="cont-check-info"> 

                        <div class="containerPesquisa">
                            <input type="number" class="inputcod" name="codigo" id="codigo" v-model="Uso.codigo" placeholder="Código informado pelo cliente" maxlength="80" min="0" required>

                        </div>

                        <div class="cont-btn-pesq">
                            <button class="btn" @click.prevent="listinformacoes" id="btnbuscar" >Buscar</button>
                        </div>

                      
                            <label for="Codigo" class="label-codigo" id="label-codigo" >Código: {{cliente.codigo}}</label> 
                            <label for="cliente" class="label-cliente" id="label-cliente">Cliente:{{cliente.cliente}}</label> 
                            <label for="combustivel" class="label-combustivel" id="label-combustivel">Combustivel:{{cliente.posto}}</label> 
                            <label for="litros" class="label-litros" id="label-litros">Litros:{{cliente.litros}}</label>
                      

                        <div class="cont-list-cred">

                    
                            
                            <table>
                                
                                <thead>

                                    <tr>
                                        <th class="label-list">Código</th>
                                        <th class="label-list">Combustivel</th>
                                        <th class="label-list">Litros</th>
                                        <th class="label-list">Total</th>
                                    </tr>

                                </thead> 

                                        <tbody >
                                                <tr v-for="caixausolist of caixausolists" :key="caixausolist.lista_codigo" >
                                                    <td class="label-list-td" >{{caixausolist.lista_credito}}</td>
                                                    <td class="label-list-td">{{caixausolist.combustivel}}</td>
                                                    <td class="label-list-td">{{caixausolist.credito_litros}}</td>
                                                    <td class="label-list-td">{{caixausolist.credito_total}}</td>
                                                </tr>
                                        
                                        </tbody> 
                            </table>           
                        </div>

                      
                            <label for="Codigo" class="label-total-litro" id="label-litro">Litro(s): {{cliente.litros}}</label>
                            <label for="Codigo" class="label-total-valor" id="label-valor">Total: {{cliente.valortotal}}</label>

                            <input type="button" class="btn btn-confirma" @click.prevent="updatecaixa" value="Confirmar Abastecimentos" id="btngravar" >
                       
               </div> 

              

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
        data (){
            return {
                    Uso: { 
                    codigo: "", 
                    },
                    usedit: {
                        "codigo": ""
                    },
                     cliente: {
                        "codigo": "",
                        "cliente": "",
                        "posto": "",
                        "data": "",
                        "valortotal": "",
                        "litros": ""
                    },
                    Usos: [],
               
                      caixausolist: {
                        "lista_codigo": "",
                        "lista_caixa": "",
                        "lista_posto": "",
                        "lista_credito": "",
                        "combustivel": "",
                        "valor_combustivel": "",
                        "credito_litros": "",
                        "credito_total": ""
                    },
                     caixausolists: [],
                    errors: [],
                }
            },
        mounted(){
         
        },
        methods: {

              listinformacoes(){ 
                this.$store.dispatch("listacheckout", this.Uso).then(Response =>{
                console.log(Response);
                this.cliente =  Response.data.RegistrodeUso;
                this.caixausolists = Response.data.caixauso;
                this.usedit = Response.data.RegistrodeUso;
                 this.Uso.codigo = "";
                    console.log(this.usedit)
                }).catch(e =>{
                    alert(e," Não foi encontrado nenhum registro");
                  })
            },

            updatecaixa(){
              
                this.$store.dispatch("updatecheckposto", this.usedit).then(Response =>{
                    console.log(Response);
                    this.updatecaixausocredito();
                    alert(Response.data.mensagem)
                    this.cliente = {}
                    this.caixausolists = {}
                    this.Uso.codigo = ""; 
                }).catch(e =>{
                    alert(e.errors + "Erro ao gravar por favor verifique os dados");
                  })
            },

            updatecaixausocredito(){
                 var teste = {
                    array: this.caixausolists
                    }
                this.$store.dispatch("updatecaixausocredito", teste).then(Response =>{
                  console.log(Response, teste)  
                })
            }
           
            
        }
    }
</script>

<style scoped>

   html, body{
    
    background: #E5E5E5;
    height: 100%;
    width: 100%;
    
   }
    .container{    
        display: flex;
        height: 580px;
        width: 1345px;
        margin-top: 30px;
        margin-bottom: 30px;
        background: #f0f0f0;
        border-radius: 20px;
        
    }

    .containerPesquisa{
       position: absolute;
        width: 250px;
        height: 56px;
        margin-top: 0px;
        margin-left: 0px;
        background: #FFFFFF;
        border: 1px solid #313638;
       border-radius: 8px;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 27px;
        align-items: center;
    
    }

    .btn{  
        width: 140px;
        height: 56px; 
        background: #F9C846;
        color: #fff;
        border-radius: 8px;
        text-align: center;
        font-weight: bold;
    }

    .cont-btn-pesq{
        position: absolute;
        margin-top: 0px;
        margin-left: 255px;      
    }
    .cont-check-info{
        width: 402px;
        height: 450px; 
        position: absolute;
        margin-top: 20px;
        margin-left: 20px;
        border-radius: 8px;
    }
    
 
    .cont-list-cred{    
        overflow-y: auto ;
        position: absolute;
        margin-top: 175px;
        width: 398px;
        height: 265px;   
        background-color: #EAEAEA;
        text-align: center;
        border-radius: 8px;
        border: #313638 1px solid; 
    }
    

    .label-codigo{
        position: absolute;
        top: 50px;
        font-size: 2.5rem;
        color: #313638;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;
        
    }

    .label-cliente{

        position: absolute;
        top: 100px;
        font-size: 1.0rem;
        color: #313638;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;

    }

    .label-combustivel{
        position: absolute;
  
        top: 120px;
        font-size: 1.0rem;
        color: #313638;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;
    }

    .label-litros{
        position: absolute;
        top: 140px;
        font-size: 1.0rem;
        color: #313638;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;
    }
  
    .label-list{
        margin-top: 10px;
        margin-left: 10px;
        color: #313638;
        font-size: 1.0rem;
        font-weight: bold;
        border: 2px solid;
  
    }
    .label-list-td{
        text-align: center !important; 
        color: #313638;
        border: 1px solid;
    }

    .label-total-litro{
        position: absolute;
        left: 300px;
        top: 445px;
        font-size: 1.0rem;
        color: #313638;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;
    }
    
    .label-total-valor{
        position: absolute;
        left: 220px;
        top: 445px;
        font-size: 1.0rem;
        color: #313638;
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: normal;   
    }

    .btn-confirma{
        
        position: absolute;
        top: 480px;
        width: 402px;
        height: 56px; 

    }
   
   

</style>