<template>
     <div id="app">

       <navbar />

 
    <div class="container">   

      <table class="list-geral">

        <thead class="cont-head-list font">

          <tr >
            <th class="head-list"> Cliente</th>
            <th class="head-list"> Combustivel</th>
            <th class="head-list"> Valor Litro</th>
            <th class="head-list"> Data Compra</th>
            <th class="head-list"> Qtd Litros</th>
            <th class="head-list"> Valor Total</th>
            <th class="head-list"> Status</th>
            <th class="head-list"> Data de Uso</th>
          </tr>

        </thead>

        

        <tbody class="cont-list-body">

          <tr v-for="venda of vendas" :key="venda.venda" >

            <td class="body-list"> {{venda.cliente}}</td>
            <td class="body-list"> {{venda.combustivel}}</td>
            <td class="body-list"> {{venda.valorcombustivel}}</td>       
            <td class="body-list"> {{venda.data}}</td>
            <td class="body-list"> {{venda.litros}}</td>
            <td class="body-list"> {{venda.valortotal}}</td>
            <td class="body-list"> {{venda.status}}</td>
            <td class="body-list"> {{venda.datadeuso}}</td>
        
            </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
    
      name: "app", 
    data() {
        return{
            venda:{
                cliente: "",
                codcomb: "",
                combustivel: "",
                data: "",
                datadeuso: "",
                litros: "",
                posto: "",
                status: "",
                valorcombustivel: "",
                valortotal: "",
                venda: ""                   
            },
            vendas:[],
           
        }      
    },
       mounted(){
             this.listar();
         }, 

     methods: {

          listar(){
                this.$store.dispatch("listarvendas").then(Response =>{
                console.log(Response.data);
                this.vendas = Response.data.compracredito;
                console.log(this.vendas);
                })
            }
     },
      components:{
            Navbar
        }
    
}
</script>


<style scoped>

html, body{
    background: #E5E5E5;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    }

.font{
    font-weight: bold;
    font-size: 1.2rem;
}

.head-list{
  
  border: #313638 2px solid;
   text-align: center;
}

.body-list{
  border: #313638 1px solid; 
  text-align: center;

}
.list-geral{
  margin-top: 15px;
}

</style>