<template>
 <footer id="myFooter">
   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
        
            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <img src="@/assets/logo.png" style="height: 200px; width: 230px;">
                    </div>
                    <div class="col-sm-2">
                        <h5>Inicio</h5>
                        <ul>
                            <li><a href="/menu">Página Inicial</a></li>
                            <li><a href="/informacoes">Editar Cadastro</a></li>
                            <li><a href="/combustivel">Combustível</a></li>
                            <li><a href="/vendas">Vendas</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-2">
                        <h5>Sobre-nós</h5>
                        <ul>
                            <li><a href="#">Projeto Fuel Supply</a></li>
                            <li><a href="#">Quem somos nós</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-2">
                        <h5>Suporte</h5>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Telefones</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <div class="social-networks">
                            <a href="#" class="twitter"><i style="color: #A9A9A9;" class="fab fa-twitter"></i></a>
                            <a href="#" class="facebook"><i style="color: #A9A9A9;" class="fab fa-facebook"></i></a>
                            <a href="#" class="instagram"><i style="color: #A9A9A9;" class="fab fa-instagram"></i></a>
                        </div>
                        <a href="#">
                            <button type="button" class="btn btn-default">Contato</button>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>© 2021 Copyright - Fuel Supply</p>
            </div>
        </footer>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>

<style scoped>



#myFooter {
    background-color: #303030;
    color: white;
    padding-top: 30px;
}

#myFooter .footer-copyright {
    background-color: #1C1C1C;
    padding-top: 3px;
    padding-bottom: 3px;
    text-align: center;
}

#myFooter .row {
    margin-bottom: 60px;
}

#myFooter .navbar-brand {
    margin-top: 45px;
    height: 65px;
}

#myFooter .footer-copyright p {
    margin: 10px;
    color: #A9A9A9;
}

#myFooter ul {
    list-style-type: none;
    padding-left: 0;
    line-height: 1.7;
}

#myFooter h5 {
    font-size: 18px;
    color: #d58300;
    font-weight: bold;
    margin-top: 30px;
}

#myFooter h2 a{
    font-size: 50px;
    text-align: center;
    color: #fff;
}

#myFooter a {
    color: #FFFACD;
    text-decoration: none;
}

#myFooter a:hover,
#myFooter a:focus {
    text-decoration: none;
    color: #d58300;
}

#myFooter .social-networks {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 16px;
}

#myFooter .social-networks a {
    font-size: 32px;
    color: #d58300;
    padding: 10px;
    transition: 0.2s;
}

#myFooter .social-networks a:hover {
    text-decoration: none;
}

#myFooter .facebook:hover {
    color: #0077e2;
}

#myFooter .instagram:hover {
    color: purple;
}

#myFooter .twitter:hover {
    color: #00aced;
}

#myFooter .btn {
    color: white;
    background-color: #d58300;
    border-radius: 20px;
    border: none;
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-top: 10px;
    line-height: 25px;
}

@media screen and (max-width: 767px) {
    #myFooter {
        text-align: center;
    }
}


/* CSS utilizado para posicionar o rodapé no final da página. */

html{
    height: 100%;
}

body{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    height: 100%;
}

.content{
   flex: 1 0 auto;
   -webkit-flex: 1 0 auto;
   min-height: 200px;
}

#myFooter{
   flex: 0 0 auto;
   -webkit-flex: 0 0 auto;
}
</style>
