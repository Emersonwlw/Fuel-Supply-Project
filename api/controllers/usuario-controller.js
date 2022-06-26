const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Cadastrarusuario = (req, res, next) => {
  // abre o insert na tabela

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      "Select * from  usuario where email = ? or cpf = ?",
      [req.body.email, req.body.cpf],

      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        if (result.length > 0) {
          res.status(409).json({ mensagem: "Usuario já cadastrado" });
        } else {
          bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
              return res.status(500).json({ error: errBcrypt });
            }

            conn.query(
              "INSERT into usuario(cpf, nome, fone, cep, cidade, email, dtnasc, endereco, bairro, numendereco, complemento, senha) values (?,?,?,?,?,?,?,?,?,?,?,?)",

              [
                req.body.cpf,
                req.body.nome,
                req.body.fone,
                req.body.cep,
                req.body.cidade,
                req.body.email,
                req.body.dtnasc,
                req.body.endereco,
                req.body.bairro,
                req.body.numendereco,
                req.body.complemento,
                hash,
              ],

              (error, result, field) => {
                conn.release();

                if (error) {
                  return res.status(500).json({ error: error });
                }

                const Response = {
                  mensagem: "Usuario criado com sucesso",
                  UsuarioCriado: {
                    cpf: req.body.cpf_user,
                    nome: req.body.nome,
                    fone: req.body.fone,
                    cep: req.body.cep,
                    cidade: req.body.cidade,
                    email: req.body.email,
                    dtnasc: req.body.dtnasc,
                    endereco: req.body.endereco,
                    bairro: req.body.bairro,
                    numendereco: req.body.numendereco,
                    complemento: req.body.complemento,
                  },
                };
                res.status(201).json(Response);
              }
            );
          }); //termina o bcrypt
        }
      }
    );
  });
};

exports.Login = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    const query = "Select * from usuario where email = ?";
    conn.query(query, [req.body.email], (error, results, fields) => {
      conn.release();

      if (error) {
        return res.status(500).json({ error: error });
      }

      if (results.length < 1) {
        return res.status(401).json({ mensagem: "Falha na autenticação " });
      }
      bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
        if (error) {
          return res.status(401).json({ mensagem: "Falha na autenticação " });
        }
        if (result) {
          const token = jwt.sign(
            {
              Nome: results[0].nome,
              email: results[0].email,
              cpf: results[0].cpf,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "10h",
            }
          );
          return res
            .status(200)
            .json({ mensagem: "Autenticado com sucesso", token: token });
        }
        return res.status(401).json({ mensagem: "Falha na autenticação " });
      });
    });
  });
};

exports.getusuario = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      "Select * from usuario where cpf = ?;",

      [req.usuario.cpf],

      (error, result, fields) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhum usuario com este CPF",
          });
        }

        const Response = {
          Usuario: {
            cpf: result[0].cpf,
            nome: result[0].nome,
            fone: result[0].fone,
            cep: result[0].cep,
            cidade: result[0].cidade,
            email: result[0].email,
            dtnasc: result[0].dtnasc,
            endereco: result[0].endereco,
            bairro: result[0].bairro,
            numendereco: result[0].numendereco,
            complemento: result[0].complemento,
          },
        };
        return res.status(200).json(Response);
      }
    );
  });
};

exports.updateusuario = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Update usuario
                Set fone    = ?,
                cep         = ?, 
                cidade      = ?,  
                dtnasc      = ?, 
                endereco    = ?, 
                bairro      = ?, 
                numendereco = ?, 
                complemento = ?
                Where cpf   = ?`,

      [
        req.body.fone,
        req.body.cep,
        req.body.cidade,
        req.body.dtnasc,
        req.body.endereco,
        req.body.bairro,
        req.body.numendereco,
        req.body.complemento,
        req.usuario.cpf,
      ],

      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        const Response = {
          mensagem: "Usuario atualizado com sucesso",

          UsuarioAtualizado: {
            fone: req.body.fone,
            cep: req.body.cep,
            cidade: req.body.cidade,
            dtnasc: req.body.dtnasc,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            numendereco: req.body.numendereco,
            complemento: req.body.complemento,
          },
        };
        return res.status(202).json(Response);
      }
    );
  });
};

exports.deleteusuario = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Delete from usuario where cpf = ?`,

      [req.usuario.cpf],

      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        const Response = {
          mensagem: "Usuario removido com sucesso",

          resquest: {
            tipo: "Post",
            descrição: "Insere um Usuario",
            url: "http://localhost:3000/usuario",
            body: {
              cpf: "varchar",
              nome: "varchar",
              fone: "varchar",
              cep: "varchar",
              cidade: "varchar",
              email: "varchar",
              dtnasc: "date",
              endereco: "varchar",
              bairro: "varchar",
              numendereco: "int",
              complemento: "varchar",
              senha: "varchar",
            },
          },
        };
        res.status(202).json(Response);
      }
    );
  });
};

/*
router.get('/',login, (req,res,next)=>{
   
    mysql.getConnection((error, conn)=> {

        if(error){return res.status(500).json({error: error})}

        conn.query(
            'Select * from usuario;',

            (error, result, fields)=> {

                if(error){return res.status(500).json({error: error})}

                const Response ={

                    quantidade: result.length,
                    usuarios: result.map(user =>{

                        return {
                            cpf: user.cpf,
                            nome: user.nome,
                            fone: user.fone,
                            cep: user.cep,
                            cidade: user.cidade,
                            email: user.email,
                            dtnasc: user.dtnasc,
                            endereco: user.endereco,
                            bairro: user.bairro,
                            numendereco: user.numendereco,
                            complemento: user.complemento,

                            request: {
                                tipo:  'GET',
                                descrição: 'Retorna os detalhes de um usuario especifico ',
                                url: 'http://localhost:3000/usuario/' + user.cpf
                            }
                        }

                    })

                }

                return res.status(200).json(Response);
                }
            
            
            )


    });

}); //termino do select geral
*/
