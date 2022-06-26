<template>
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Fuel Supply - Combustível</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> 

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet">

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap" rel="stylesheet">  
    </head>

    <body class="containertelacomb">
      <Navbar />

      <div class="containercomb">
        <ul>
          <li v-for="(erro, index) of errors" :key="index">
            erro <b>{{erro.field}} </b> - {{erro.defaultMessage}}
          </li>
        </ul>

        <h2 class="titulocomb">Combustíveis</h2>

        <form>
          <div class="divinfocomb" style="width: 61%; margin-left: 3%">
            <h4 class="labelcomb">Combustível:</h4>
            <input type="textarea" class="inputscomb" placeholder="Nome do combustível..." name="nome" id="valor" v-model="combustivel.Nome">
          </div>
            
          <div class="divinfocomb" style="width: 30%; margin-left: 2%">
            <h4 class="labelcomb">Preço:</h4>
            <input type="textarea" class="inputscomb" placeholder="Preço do combustível..."  name="Preço" id="Preço" v-model="combustivel.Valor" >
          </div>
          
          <button class="btnsalvarcomb" @click.prevent="salvar">SALVAR<i class="material-icons left">done</i></button>
        </form>
      </div>

      <div class="divlistcomb">
        <table class="tablecomb">
          <thead>
            <tr class="trtitulocomb">
              <th>NOME</th>
              <th>PREÇO</th>
              <th>OPÇÕES</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="combustivel of combustivels" :key="combustivel.Codigo" >
              <td>{{combustivel.Nome}}</td>
              <td>{{combustivel.Valor}}</td>
              <td>
                <button @click="editar(combustivel)" class="waves-effect btn-small darken-1" style="background-color: #64844C"><i class="material-icons">create</i></button>
                <button @click="carregar(combustivel)" class="waves-effect btn-small darken-1" style="background-color: #FB6107; margin-left: 3px"><i class="material-icons">delete_sweep</i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
</template>

<script>
  import Navbar from '../components/Navbar.vue';

  export default {

    components:{
            Navbar
        },

    name: "app", 
    data (){
      return {
        combustivel: { 
          Codigo: "",
          Nome: "",
          Valor: "",
          
         
        }, 
        combustivels: [],
        errors: []
      }
    },

     mounted(){
        this.listar();
    }, 
      
    methods: {

      listar(){
        this.$store.dispatch("listarcombustivel").then(Response =>{
          console.log(Response.data.Combustiveis);
          this.combustivels = Response.data.Combustiveis;
         })
      },

      salvar(){
        if(!this.combustivel.Codigo){ //verifica se o campo codigo do objeto é null, se sim cadastra
            if(this.combustivel.Nome != "" ){
            if(this.combustivel.Valor != ""){
          this.$store.dispatch("gravarcombustivel", this.combustivel).then(Response =>{
                        this.combustivel = {}
                        console.log(Response);
                        alert('Salvo com sucesso');
                          this.listar();
                          this.errors = []
                  }).catch(e =>{
                    console.log(Response.error)
                    this.errors = e.Response.data.errors
                  })
              } else{
              alert('Todos campos devem estar preenchidos')
            }
            }else{
              alert('Todos campos devem estar preenchidos')
            }
        }//terminar verificação modo cadastro ou atualização
        else{ //entra na atualização caso não se cadastro

           if(this.combustivel.Nome != "" ){
            if(this.combustivel.Valor != ""){
           this.$store.dispatch("atualizarcombustivel", this.combustivel).then(Response =>{
                        this.combustivel = {}
                        console.log(Response);
                        alert('Atualizado com sucesso');
                          this.listar();
                          this.errors = []
                  }).catch(e =>{
                    console.log(Response.error)
                    this.errors = e.Response.data.errors
                  })
              } else{
              alert('Todos campos devem estar preenchidos')
            }
            }else{
              alert('Todos campos devem estar preenchidos')
            }

        }//termina a atualização
      },
        editar(combustivel) {
        this.combustivel = combustivel

      },

      
      carregar(combustivel){
         this.combustivel = combustivel;
         this.remover();
      },
        remover(combustivel){

          if(confirm("Deseja remover o combustivel?")){
                this.$store.dispatch('apagarcombustivel', this.combustivel).then(Response=>{
                    console.log(combustivel)
                    console.log(Response)
                    location.reload();
                    this.errors = []
                  }).catch(e =>{
                      this.errors = e.Response.data.errors
                    })
          }
      },   
    }
  }
</script>

<style scoped>
  .containertelacomb{
    background-color: #E5E5E5;
  }
  .containercomb{
    width: 100%;
    height: 50vh;
    background-color: #FFF;;
    padding: 30px;
    margin-top: 20px;
    border-top: 1px solid #F9C846;
    border-bottom: 1px solid #F9C846;
  }
  .titulocomb{
    color: #FB6107;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .labelcomb{
    color: #313638;
    font-size: 18px;
    font-weight: 700;
  }
  .divinfocomb{
    display: block;
    float: left;
  }
  .inputscomb{
    border: 1px solid #313638;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
    outline: none;
  }
  .btnsalvarcomb{
    float: right;
    background-color: #F9C846;
    color: #FFF;
    border-color: transparent;
    padding: 10px;
    font-size: 20px;
    width: 160px;
    height: 50px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-right: 4%;
    margin-top: 30px;
    font-family: 'Rajdhani', sans-serif;
  }
  .divlistcomb{
    background-color: #FFF;
    margin-top: 20px;
    border-radius: 15px;
    padding: 20px;
    margin-left: 5%;
    margin-right: 5%;
    height: 500px;
    overflow-y: auto ;
    
  }
  .trtitulocomb{
    color: #313638;
  }
  .tablecomb{
    align-items: center;
    justify-content: center;
    margin-left: 7%;
  }
</style>
