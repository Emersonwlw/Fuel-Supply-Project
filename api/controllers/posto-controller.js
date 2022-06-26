const mysql = require("../mysql").pool;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.cadastroposto = (req, res, next)=>{

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).json({error: error})}

        conn.query('Select * from  posto where email = ? or cnpj = ?',
        [req.body.email, req.body.cnpj],

        (error, result)=> {

            if(error){return res.status(500).json({error: error})}

            if(result.length > 0){
                res.status(409).send({mensagem: 'Posto já cadastrado'})
            }else{
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash)=>{
                    if(errBcrypt) {return res.status(500).json({error: errBcrypt})}

                    conn.query(`Insert into posto (
                        cnpj,
                        razaosocial,
                        endereco,
                        bairro,
                        cidade,
                        cep,
                        numendereco,
                        fone,
                        ie,
                        bandeira,
                        tipo,
                        email,
                        senha) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        
                        [req.body.cnpj, req.body.razaosocial, req.body.endereco, req.body.bairro, req.body.cidade, 
                        req.body.cep, req.body.numendereco, req.body.fone, req.body.ie, req.body.bandeira, req.body.tipo,
                        req.body.email, hash],

                        (error, result, field)=>{
                                conn.release();

                                if(error){return res.status(500).json({error: error})}

                                const Response = {
                                    mensagem:  'Posto cadastrado com sucesso',
                                    UsuarioCriado: {
                                        cnpj: req.body.cnpj,
                                        razaosocial: req.body.razaosocial,
                                        endereco: req.body.endereco,
                                        bairro: req.body.bairro,
                                        cidade: req.body.cidade,
                                        cep: req.body.cep,
                                        numendereco: req.body.numendereco,
                                        fone: req.body.fone,
                                        ie: req.body.ie,
                                        bandeira: req.body.bandeira,
                                        tipo: req.body.tipo,
                                        email: req.body.email,
                                    }
                                }
                                res.status(201).json(Response);
                            }
                        
                        )


                });//termina o bcrypt
            }

        });
    });
};

exports.loginposto = (req, res, next)=> {

    mysql.getConnection((error, conn)=>{

        if(error){return res.status(500).send({error: error})}

        const query = 'Select * from posto where email = ?';

        conn.query(query, [req.body.email],(error, results, fields)=>{
            conn.release();

            if(error){return res.status(500).send({error: error})}

            if(results.length < 1){
                return res.status(401).send({mensagem: 'Falha na autenticação'})
                console.error({mensagem:'Falha na autenticação'})
            }
            
            bcrypt.compare(req.body.senha, results[0].senha, (error, result)=> {
                if(error){
                    return res.status(401).send({mensagem: 'Falha na autenticação '})
                }
                if(result){
                    const token = jwt.sign({
                        Razao: results[0].razaosocial,
                        email : results[0].email,
                        cnpj : results[0].cnpj
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "10h"
                    });
                    return res.status(200).send({mensagem: 'Autenticado com sucesso', token: token});
                }
                return res.status(401).send({mensagem: 'Falha na autenticação '})
                console.error({mensagem:'Falha na autenticação'})
            });

        });

    });

}

exports.getposto = (req, res, next)=> {

    console.log(req.posto);    

    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
            'select * from posto where cnpj = ?;',
            [req.posto.cnpj],

            (error, result, fields)=> {
                conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length ==0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum posto com este CNPJ'
                    })
                }

                const Response = {
                    Posto: {
                        cnpj: result[0].cnpj,
                        razaosocial: result[0].razaosocial,
                        endereco: result[0].endereco,
                        bairro: result[0].bairro,
                        cidade: result[0].cidade,
                        cep: result[0].cep,
                        numendereco: result[0].numendereco,
                        fone: result[0].fone,
                        ie: result[0].ie,
                        bandeira: result[0].bandeira,
                        tipo: result[0].tipo,
                        email: result[0].email

                    }
                }

                return res.status(200).json(Response);
            }
        )

    })

}


exports.getcombdoposto = (req, res, next)=> {
 

    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `select combustivel.codigo, combustivel.nome, combustivel.valor
            from combustivel
            where combustivel.status = "Ativo" and combustivel.posto = ?`,

            [req.body.cnpj],

            (error, result, fields)=> {
                conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length ==0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum registro'
                    })
                }
                const Response = {
                    quantidade: result.length,

                    Postos: result.map(post =>{
                        return{
                            codigo: post.codigo,
                            nome: post.nome,
                            valor: post.valor,                                                           
                        }               

                    })         
                    
                }

                return res.status(200).json(Response);
            }
        )

    })

} //getcombdoposto

exports.getpostoecomb = (req, res, next)=> {
 

    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `select posto.cnpj, posto.razaosocial,posto.fone,posto.endereco, posto.numendereco, posto.bairro,
            posto.cidade, posto.bandeira,posto.tipo, combustivel.codigo, combustivel.nome, combustivel.status,
            combustivel.valor
            from posto join combustivel
            on posto.cnpj = combustivel.posto
            where combustivel.status = "Ativo"  and combustivel.posto = ?`,

            [req.body.cnpj],

            (error, result, fields)=> {
                conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length ==0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum registro'
                    })
                }
                const Response = {

                    posto: {
                        cnpj: result[0].cnpj,
                        razaosocial: result[0].razaosocial,
                        fone: result[0].fone,
                        endereco: result[0].endereco,
                        numendereco: result[0].numendereco,
                        bairro: result[0].bairro,
                        cidade: result[0].cidade,
                        bandeira: result[0].bandeira,
                        tipo: result[0].tipo,
                    },

                    quantidade: result.length,

                    Postos: result.map(post =>{
                        return{
                            codigo: post.codigo,
                            nome: post.nome,
                            valor: post.valor,                                                           
                        }               

                    })         
                    
                }

                return res.status(200).json(Response);
            }
        )

    })

}//getpostoecomb

exports.getpostosemaut = (req, res, next)=> {
 

    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
            'select cnpj, razaosocial,endereco, numendereco, bairro, cidade, bandeira,tipo from posto',
           

            (error, result, fields)=> {
                conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length ==0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhum registro'
                    })
                }

                const Response = {
                    quantidade: result.length,

                    Postos: result.map(post =>{
                        return{
                            cnpj: post.cnpj,
                            razaosocial: post.razaosocial,
                            endereco: post.endereco,
                            numendereco:post.numendereco,
                            bairro: post.bairro,
                            cidade: post.cidade,
                            bandeira:post.bandeira,
                            tipo: post.tipo,
                        
                        }               

                    })         
                    
                }

                return res.status(200).json(Response);
            }
        )

    })

}

exports.getcomprasposto = (req, res, next)=>{

    console.log(req.posto);

    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
            `select compracredito.codigo as venda, usuario.nome as cliente,
                compracredito.combustivel as codcomb, combustivel.nome as combustivel , 
                compracredito.valorcombustivel, DATE_FORMAT(compracredito.data ,'%d/%m/%Y') as datadeuso, compracredito.litros, 
                compracredito.valortotal, compracredito.status, compracredito.datauso as Data_de_Uso 
                from compracredito join usuario
                on compracredito.usuario = usuario.cpf
                join combustivel
                on compracredito.combustivel = combustivel.codigo
                where compracredito.posto = ?`,
            
                [req.posto.cnpj],

            (error, result, fields)=> {
                conn.release();
                if(error){return res.status(500).json({error: error})}

                if(result.length == 0){
                    return res.status(404).json({
                        mensagem: 'Não foi encontrado nenhuma Venda'
                    })
                }

                const Response ={

                    compracredito: result.map(cpcr =>{
                        
                    return {

                        venda: cpcr.venda,
                        cliente: cpcr.cliente,
                        codcomb: cpcr.codcomb,
                        combustivel:cpcr.combustivel,
                        valorcombustivel: cpcr.valorcombustivel,
                        data:cpcr.datadeuso,
                        litros:cpcr.litros,
                        valortotal:cpcr.valortotal,     
                        status: cpcr.status,
                        datadeuso : cpcr.Data_de_Uso
                    }
                    
                    })
                }
                return res.status(200).json(Response);
            }
                
        )     

    });
};

exports.updateposto = (req, res, next)=>{

    console.log(req.posto);

    mysql.getConnection((error, conn)=> {
        if(error){return res.status(500).json({error: error})}

        conn.query(
            `Update posto
                set razaosocial = ?,
                    endereco = ?,
                    bairro = ?,
                    cidade = ?,
                    cep = ?,
                    numendereco = ?,
                    fone = ?,
                    ie = ?,
                    bandeira = ?,
                    tipo = ?,
                    email  = ?
                    where cnpj = ?`,

                    [req.body.razaosocial, req.body.endereco, req.body.bairro, req.body.cidade, 
                    req.body.cep, req.body.numendereco, req.body.fone, req.body.ie, req.body.bandeira, req.body.tipo,
                    req.body.email, req.posto.cnpj],

                    (error, result, field)=>{
                        conn.release();

                        if(error){return res.status(500).json({error: error})}

                        const Response = {
                            mensagem: 'Posto atualizado com sucesso',

                            Postoatualizado: {
                                cnpj: req.body.cpf_user,
                                razaosocial: req.body.razaosocial,
                                endereco: req.body.endereco,
                                bairro: req.body.bairro,
                                cidade: req.body.cidade,
                                cep: req.body.cep,
                                numendereco: req.body.numendereco,
                                fone: req.body.fone,
                                ie: req.body.ie,
                                bandeira: req.body.bandeira,
                                tipo: req.body.tipo,
                                email: req.body.email
                            }
                        }
                        return res.status(202).json(Response);
                    }
                    
            )

    })

}

exports.deleteusuario = (req, res, next)=> {

    console.log(req.posto);

    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).json({error: error})}

        conn.query(
            `Delete from posto where cnpj = ?`,
                [req.posto.cnpj],

                (error, result, field)=>{
                    conn.release();

                    if(error){return res.status(500).json({error: error})}

                    const Response = {
                        mensagem: 'Posto removido com sucesso',
                    }

                    res.status(202).json(Response);
                }
         )
    });

};