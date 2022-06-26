const mysql = require("../mysql").pool;

exports.postcarteira = (req, res, next)=>{


    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).json({error: error})}

        conn.query(
            'insert into carteira (usuario, credito) values (?,?)',

            [req.body.usuario, req.body.credito],

            (error, result, field) =>{
                conn.release();

                    if(error){return res.status(500).json({error: error})}

                    const Response={
                        mensagem: 'Carteira inserida com sucesso',

                        Carteiracadastrada: {
                            codigo: result.codigo,
                            usuario: req.body.usuario,
                            credito: req.body.credito
                        }
                    }
                    return res.status(201).json(Response);
            }

        )

    })


};

exports.getcarteira = (req, res, next)=>{

    console.log(req.usuario);

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `Select carteira.usuario, usuario.nome as Nome_user, carteira.codigo as Carteira, compracredito.codigo,
                compracredito.valorcombustivel, compracredito.litros, compracredito.valortotal,
                compracredito.posto, posto.razaosocial as Posto_razao, compracredito.combustivel , combustivel.nome as Comb_nome, 
                compracredito.data
        
                from carteira join usuario
                on carteira.usuario = usuario.cpf
                join compracredito
                on compracredito.usuario = carteira.usuario
                join posto
                on compracredito.posto = posto.cnpj
                join combustivel
                on compracredito.combustivel = combustivel.codigo
                where carteira.usuario = ?`,

                [req.usuario.cpf],
                
                (error, result, field)=>{
                    conn.release();
                    if(error){return res.status(500).json({error: error})}

                    const Response ={
                        quantidade: result.length,
                        creditosnacarteira: result.map(crcart =>{
                            return{
                                Carteira: {
                                    Carteira: crcart.Carteira,
                                    Usuario: crcart.usuario,
                                },

                                Usuario: {
                                    Nome_usuario: crcart.Nome_user,
                                },
                                
                                Compra_credito:{
                                    Cod_Compra: crcart.codigo,
                                    Combustivel_cod: crcart.combustivel,
                                    Valor_combustivel: crcart.valorcombustivel,
                                    Litros: crcart.litros,
                                    Valor_total: crcart.valortotal,
                                    Posto_cod: crcart.posto,
                                    Data_compra: crcart.data,
                                },

                                Posto:{
                                    Posto_nome: crcart.Posto_razao,
                                },

                                Combustivel:{
                                    Combustivel_nome: crcart.Comb_nome,
                                }

                            }

                        })

                    }

                    return res.status(200).json(Response);

                }


        )

    });

};

exports.updatecarteira = (req, res, next)=>{

    console.log(req.usuario);
    
    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(

            `Update carteira
                set   usuario = ?,
                      credito = ?
                where carteira.codigo = ? and carteira.usuario = ?`,

                [req.body.usuario, req.body.credito, req.body.codigo, req.usuario.cpf],

                (error, result, field)=>{
                    conn.release();

                    if(error){return res.status(500).json({error: error})}

                    const Response ={
                        mensagem: 'Carteira atualizada com sucesso',

                        Carteiraatualizada:{

                            codigo: req.body.codigo,
                            usuario: req.body.usuario,
                            credito: req.body.credito

                        }
                    }

                    return res.status(202).json(Response);
                
                }

        )

    })

};


exports.deletecarteira =  (req, res, next)=>{

    console.log(req.usuario);

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `Delete from carteira where carteira.codigo = ? and carteira.usuario = ?`,
            [req.body.codigo , req.usuario.cpf],

            (error, resultado, field)=>{
                conn.release();

                if(error){return res.status(500).json({error: error})}

                const Response = {

                    mensagem: 'Carteira deletada com sucesso',                  

                }

                res.status(202).json(Response);

            }

        )

    });

};