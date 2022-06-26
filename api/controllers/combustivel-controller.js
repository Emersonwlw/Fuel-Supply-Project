const mysql = require("../mysql").pool;

exports.cadastracombustivel = (req, res,next)=> {

    console.log(req.posto);

    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
                'Insert into combustivel (nome, posto,valor, status) values (?,?,?,?)',

                [req.body.Nome, req.posto.cnpj, req.body.Valor, "Ativo"],

                (error, result, field) =>{
                    conn.release();

                    if(error){return res.status(500).json({error: error})}

                    const Response = {
                        mensagem:  'Combustivel cadastrado com sucesso',

                        CombustivelCriado: {

                            id: result.codigo,
                            Nome: req.body.nome,
                            Posto: req.posto.cnpj,
                            Valor: req.body.valor
                        }
                    }
                    return res.status(201).json(Response);
                 }
                
         )

    });

};


exports.getcombsaut = (req,res,next)=>{

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `Select combustivel.codigo, combustivel.nome,combustivel.posto as cnpj, 
            posto.razaosocial as posto, combustivel.valor, combustivel.status
            from combustivel join posto
            on combustivel.posto = posto.cnpj
            where combustivel.status = "Ativo"`,

                (error, result, field)=>{
                    conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length == 0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum registro'
                    })
                } 

                const Response ={

                    quantidade: result.length,
                    Combustiveis: result.map(comb =>{

                        return {
                        Codigo: comb.codigo,
                        Nome: comb.nome,
                        CNPJ: comb.cnpj,
                        Posto: comb.posto,
                        Valor: comb.valor,
                        Status: comb.status
                        }
                    })

                }
                return res.status(200).json(Response);
            }

        )

    });

};

exports.getcombustivel = (req,res,next)=>{

    console.log(req.posto);

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(
            'Select * from combustivel where posto = ? and status = "Ativo"',

            [req.posto.cnpj],

            (error, result, field)=>{
                conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length == 0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum registro'
                    })
                } 

                const Response ={

                    quantidade: result.length,
                    Combustiveis: result.map(comb =>{

                        return {
                        Codigo: comb.codigo,
                        Nome: comb.nome,
                        Posto: comb.posto,
                        Valor: comb.valor,
                        Status: comb.status
                        }
                    })

                }
                return res.status(200).json(Response);
            }

        )

    });

};

exports.getumcombustivel = (req, res,next)=>{

    console.log(req.posto);

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(
            'Select * from combustivel where codigo = ? and posto = ? and status = "Ativo"',

                [req.params.codigo_comb, req.posto.cnpj],
                
            (error, result, field)=>{
                conn.release();

                if(error){return res.status(500).json({error: error})}

                if(result.length == 0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum combustivel com este codigo'
                    })
                 }  

                const Response ={

                    Combustivel: {
                        Codigo: result[0].codigo,
                        Nome: result[0].nome,
                        Posto: result[0].posto,
                        Valor: result[0].valor,
                        status: result[0].status                   
                    }
            
                 }
                return res.status(200).json(Response);
            }

        )

    });


};

exports.updatecombustivel = (req, res, next)=>{ //proteger esta rota ainda 

    console.log(req.posto);

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(

            `Update combustivel
                Set nome     = ?,
                posto        = ?,
                valor        = ?,
                status       = ?
                where codigo = ? and posto = ?`,
                
                [req.body.Nome, req.posto.cnpj, req.body.Valor,"Ativo", req.body.Codigo, req.posto.cnpj],

                (error, result, field)=>{
                    conn.release();

                    if(error){return res.status(500).json({error: error})}

                    const Response = {

                        mensagem: 'Combustivel atualizado com sucesso',
                        
                        Combustivelatualizado:{

                            codigo: req.body.Codigo,
                            nome: req.body.Nome,
                            posto: req.body.posto,
                            valor: req.body.Valor
                        }
                     
                    }
                    return res.status(202).json(Response);

                }
        )

    });

};

exports.deletecombustivel = (req, res, next)=> { 

    console.log(req.posto);

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `Update combustivel
            Set nome     = ?,
            posto        = ?,
            valor        = ?,
            status       = ?
            where codigo = ? and posto = ?`,
            
            [req.body.Nome, req.posto.cnpj, req.body.Valor,"Desativado", req.body.Codigo, req.posto.cnpj],

            (error, result, field)=>{
                conn.release();

                if(error){return res.status(500).json({error: error})}

                const Response = {

                   mensagem: 'Combustivel removido com sucesso',
                    Combustivelremovido:{

                        codigo: req.body.Codigo,
                        nome: req.body.Nome,
                        posto: req.body.posto,
                        valor: req.body.Valor
                    }

                }
                res.status(202).json(Response);
            }

        )
    

    })

};