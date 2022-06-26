<template>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Posto de Combustível</title>
             
    </head>
       
    <body class="bodyCadastro">
             <div id="cadastrocontainer">
            <h3 class="titulo">Cadastre-se para obter acesso ao sistema</h3>
            <form action="" method="" id="formCadastro" class="formCadastro">
                <div class="fullBox">
                    <label for="razaosocial" class="labelInput labels">Razão social:</label>
                    <input type="text" class="labelInput inputs" name="razaosocial" id="razaosocial" v-model="cadastro.razaosocial" placeholder="Informe a razão social do posto..." maxlength="80" required>
                </div>

                <div class="halfBox spacing">
                    <label for="cnpj" class="labelInput labels">CNPJ:</label>
                    <input type="text" class="labelInput inputs" name="cnpj" id="cnpj" v-model="cadastro.cnpj" placeholder="Informe o CNPJ..." maxlength="18" required>
                </div>

                <div class="halfBox">
                    <label for="ie" class="labelInput labels">Número de Inscrição Estadual (IE):</label>
                    <input type="text" class="labelInput inputs" name="ie" id="ie" v-model="cadastro.ie" placeholder="Informe o número da Inscrição Estadual..." maxlength="20" required> 
                </div>

                <div class="fullBox">
                    <label for="endereco" class="labelInput labels">Endereço:</label>
                    <input type="text" class="labelInput inputs" name="endereco" id="endereco" v-model="cadastro.endereco" placeholder="Informe o endereço..." maxlength="100" required>
                </div>

                <div class="halfBox spacing">
                    <label for="numero" class="labelInput labels">Número:</label>
                    <input type="number" class="labelInput inputs" name="numero" id="numero" v-model="cadastro.numendereco" placeholder="Informe o número..." maxlength="6" required>
                </div>

                <div class="halfBox">
                    <label for="bairro" class="labelInput labels">Bairro:</label>
                    <input type="text" class="labelInput inputs" name="bairro" id="bairro" v-model="cadastro.bairro" placeholder="Informe o bairro..." maxlength="50" required>
                </div>

                <div class="halfBox spacing">
                    <label for="cep" class="labelInput labels">CEP:</label>
                    <input type="text" class="labelInput inputs" name="cep" id="cep" v-model="cadastro.cep" placeholder="Informe o CEP..." maxlength="12" required>
                </div>

                <div class="halfBox">
                    <label for="cidade" class="labelInput labels">Cidade:</label>
                    <input type="text" class="labelInput inputs" name="cidade" id="cidade" v-model="cadastro.cidade" placeholder="Informe a Cidade..." maxlength="50" required>
                </div>

                <div class="halfBox spacing">
                    <label class="labelInput labels">Bandeira:</label>
                    <select class="labelInput inputs" v-model="cadastro.bandeira">
                        <option>  </option>
                        <option>Branca</option>
                        <option>Ipiranga</option>
                        <option>Shell</option>
                        <option>Ale</option>
                        <option>Petrobrás</option>
                    </select>
                </div>

                <div class="halfBox">
                    <label class="labelInput labels">Tipo de posto:</label>
                    <select class="labelInput inputs" v-model="cadastro.tipo">
                        <option>  </option>
                        <option>Revendedor</option>
                        <option>Abastecimento</option>
                        <option>Escola</option>
                        <option>GNV</option>
                        <option>Flutuante</option>
                        <option>Aviação</option>
                        <option>Marítimo</option>
                    </select>
                </div>

                <div class="halfBox spacing">
                    <label for="telefone" class="labelInput labels">Telefone:</label>
                    <input type="text" class="labelInput inputs" name="telefone" id="telefone" v-model="cadastro.fone" placeholder="Informe o telefone de contato..." maxlength="15" required>
                </div>

                <div class="halfBox">
                    <label for="telefone2" class="labelInput labels">Outro telefone (Opcional):</label>
                    <input type="text" class="labelInput inputs" name="telefone2" id="telefone2"  placeholder="Informe um segundo telefone (opcional)..." maxlength="15" >
                </div>

                <div class="fullBox">
                    <label for="email" class="labelInput labels">Email:</label>
                    <input type="email" class="labelInput inputs" name="email" id="email" v-model="cadastro.email" placeholder="Informe o email..." maxlength="40" required>
                </div>

                <div class="halfBox spacing">
                    <label for="senha" class="labelInput labels">Senha:</label>
                    <input type="password" class="labelInput inputs" name="senha" id="senha" v-model="cadastro.senha" placeholder="Informe a senha..." maxlength="8" required>
                </div>

                <div class="halfBox">
                    <label for="confSenha" class="labelInput labels">Confirme a senha:</label>
                    <input type="password" class="labelInput inputs" name="confSenha" id="confSenha" placeholder="Confirme a senha..." maxlength="8" required>
                </div>

                <div class="fullBox">
                    <input type="checkbox" class="labelInput" name="confirmacao" id="confirmacao">
                    <label for="confirmacao" class="labelInput labels" id="confirmacaoLabel">Eu li e aceito os <a href="#" class="link corLaranja">Termos de Uso</a></label>
                </div>

                <div class="halfBox">
                    <input type="submit" class="labelInput inputs btnCadastrar" @click.prevent="salvar" value="Cadastrar" id="btnCadastrar">
                </div>
            </form>
        </div>  

        <p class="error template"></p>
    </body>
</html>

    
</template>

<script>

export default {

    data(){
        return{
      cadastro:{
          cnpj: '',
          razaosocial: '',
          endereco: '',
          bairro: '',
          cidade: '',
          cep: '',
          numendereco: '',
          fone: '',
          ie: '',
          bandeira:'',
          tipo: '',
          email: '',
          senha: ''
            }

        }

           
    },
     methods:{

            salvar(){
                this.$store.dispatch("gravarcadastro", this.cadastro).then(Response =>{
                      
                       console.log(Response);
                       alert('Salvo com sucesso');
                        this.$router.push("/");
                }).catch(error => {
                    alert(error)
                })
            }
        
        }   
    
}
</script>

<style scoped>
/* CSS TELA DE CADASTRO DE POSTO */

.labelInput{
    display: block;
    width: 100%;
}
.bodyCadastro{
    padding-top: 5vh;
    background-color: #e9e9e9;
}
#cadastrocontainer{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 25px;
    border-color: #e9e9e9;
    margin-top: 30px;
}
.titulo{
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.6rem;
    color: #ff8c00;
}
.formCadastro{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.fullBox{
    flex: 1 1 100%;
    position: relative;
}
.halfBox{
    flex: 1 1 45%;
    position: relative;
}
.spacing{
    margin-right: 2.5%;
}
.labels{
    font-weight: bold;
    font-size: .8rem;
}
.inputs{
    border-bottom: 2px solid #323232;
    padding: 10px;
    font-size: .9rem;
    margin-bottom: 40px;
    background-color: #f5f5f5;
}
input:focus{
    border-color: #d58300;
}
.btnCadastrar{
    background-color: #cc6607;
    color: #FFF;
    border: none;
    border-radius: 20px;
    height: 45px;
    cursor: pointer;
    margin-top: 25px;
    margin-left: 700px;
    width: 250px;
}
#confirmacao{
    margin-right: 5px;
}
#confirmacao, #confirmacaoLabel{
    display: inline-block;
    width: auto;
    margin-bottom: 10px;
}
.error{
    color: #ff1a1a;
    position: absolute;
    top: 57px;
    font-size: .8rem;
}
.template{
    display: none;
}
select:focus{
    color:#d58300;
}
.corNavbar{
    background-color: #303030;
    margin-bottom: 15px;
}
.textNav{
    color: #FFF;
}

.precoinput{
    border-bottom: 2px solid #323232;
    padding: 10px;
    height: 35px;
    font-size: .9rem;
    margin-bottom: 40px;
    background-color: #f5f5f5;
    width: 250px;
}

.btnCadastrarcomb{
    background-color: #cc6607;
    color: #FFF;
    border: none;
    border-radius: 20px;
    height: 45px;
    cursor: pointer;
    width: 250px;
}
.halfBox3{
    flex: 1 1 1 33%;
    position: relative;
}
</style>