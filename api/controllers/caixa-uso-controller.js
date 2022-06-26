const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");

exports.postcaixauso = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    const query = "Select * from usuario where cpf = ?";
    conn.query(query, [req.usuario.cpf], (error, results, fields) => {
      // conn.release();

      if (error) {
        conn.release();
        return res.status(500).json({ error: error });
      }

      if (results.length < 1) {
        conn.release();
        return res
          .status(401)
          .json({ mensagem: "Erro de autenticação, tente novamente 1" });
      }
      bcrypt.compare(req.body.senha, results[0].senha, (error, results) => {
        if (error) {
          conn.release();
          return res.status(401).json({ mensagem: " Senha Inválida " });
        }
        if (results) {
          conn.query(
            //tem que editar o compra credito colocando o status para em processo para os selecionados
            //validação feita no backend para não ter inject
            `Insert into caixauso (usuario, posto, data, status, valortotal, litros)
                            values (?,?,?,"Ativo",?,?)`,

            [
              req.usuario.cpf,
              req.body.posto,
              req.body.data,
              req.body.valortotal,
              req.body.litros,
            ],
            (error, results, field) => {
              conn.release();
              console.log("result", results)

              if (error) {
                return { error: error };
              }
              const Response = {
                mensagem: {
                  codigo: results.insertId,
                  usuario: req.usuario.cpf,
                  posto: req.body.posto,
                  valorTotal: req.body.valortotal,
                  data: req.body.data,
                  litros: req.body.litros,
                },
              };
              console.log("#####" + Response);
              return res.status(200).json({ mensagem: Response });
            }
          );
        } else {
          conn.release();
          return res
            .status(401)
            .json({ mensagem: "Erro de autenticação, tente novamente 2" });
        }
      });
    });
  });
};

exports.getcaixauso = (req, res, next) => {
  req.usuario;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `SELECT caixauso.codigo, caixauso.usuario, caixauso.posto, caixauso.data, caixauso.status,
                caixauso.valortotal, caixauso.litros, caixausocredito.codigo as lista_codigo, 
                caixausocredito.codigocaixauso as lista_caixa, caixausocredito.posto as lista_posto,
                caixausocredito.status as lista_status, caixausocredito.usuario as lista_usuario,
                caixausocredito.credito as lista_credito
                FROM heroku_dda77219f4d192a.caixauso join heroku_dda77219f4d192a.caixausocredito
                on caixauso.codigo = caixausocredito.codigocaixauso
                where caixauso.usuario = ?;`,

      [req.usuario.cpf],

      (error, result, fields) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhum registro",
          });
        }

        const Response = {
          RegistrodeUso: result.map((cxus) => {
            return {
              codigo: cxus.codigo,
              usuario: cxus.usuario,
              posto: cxus.posto,
              data: cxus.data,
              status: cxus.status,
              valortotal: cxus.valortotal,
              litros: cxus.litros,
              caixauso: {
                lista_codigo: cxus.lista_codigo,
                lista_caixa: cxus.lista_caixa,
                lista_posto: cxus.lista_posto,
                lista_status: cxus.lista_status,
                lista_usuario: cxus.lista_usuario,
                lista_credito: cxus.lista_credito,
              },
            };
          }),
        };
        return res.status(200).json(Response);
      }
    );
  });
};

exports.getcaixaposto = (req, res, next) => {
  req.posto;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `
            SELECT caixauso.codigo, usuario.nome as cliente, caixauso.posto, caixauso.data,
                caixauso.valortotal, caixauso.litros, caixausocredito.codigo as lista_codigo, 
                caixausocredito.codigocaixauso as lista_caixa, caixausocredito.posto as lista_posto,
                caixausocredito.credito as lista_credito , combustivel.nome as combustivel, compracredito.valorcombustivel as valor_combustivel,
                compracredito.litros as credito_litros, compracredito.valortotal as credito_total
                FROM heroku_dda77219f4d192a.caixauso join heroku_dda77219f4d192a.caixausocredito
                on caixauso.codigo = caixausocredito.codigocaixauso
                join heroku_dda77219f4d192a.usuario
                on caixauso.usuario = usuario.cpf
                join heroku_dda77219f4d192a.compracredito
                on caixausocredito.credito = compracredito.codigo
                join heroku_dda77219f4d192a.combustivel
                on compracredito.combustivel = combustivel.codigo
                where caixauso.codigo = ? and  caixauso.posto = ? and caixauso.status = "Ativo" 
                and caixausocredito.status = "Ativo"`,

      [req.body.codigo, req.posto.cnpj],

      (error, result, fields) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhum registro",
          });
        }

        const Response = {
          RegistrodeUso: {
            codigo: result[0].codigo,
            cliente: result[0].cliente,
            combustivel: result[0].combustivel,
            posto: result[0].posto,
            data: result[0].data,
            valortotal: result[0].valortotal,
            litros: result[0].litros,
          },
          caixauso: result.map((cxus) => {
            return {
              lista_codigo: cxus.lista_codigo,
              lista_caixa: cxus.lista_caixa,
              lista_posto: cxus.lista_posto,
              lista_credito: cxus.lista_credito,
              combustivel: cxus.combustivel,
              valor_combustivel: cxus.valor_combustivel,
              credito_litros: cxus.credito_litros,
              credito_total: cxus.credito_total,
            };
          }),
        };
        return res.status(200).json(Response);
      }
    );
  });
};

exports.updatecaixausouser = (req, res, next) => {
  req.usuario;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      //apenas para cancelar o uso
      `Update caixauso Set status = "Cancelado" Where caixauso.codigo = ? and caixauso.usuario = ?
      and  caixauso.status = "Ativo"`,

      [req.body.codigo, req.usuario.cpf],

      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        const Response = {
          mensagem: " Atualizado com sucesso",

          CaixaUsoAtualizado: {
            Codigo: req.body.codigo,
          },
        };
        return res.status(202).json(Response);
      }
    );
  });
};

exports.updatecaixausoposto = (req, res, next) => {
  //apenas para registrar o uso do credito pelo checkout do posto

  req.posto;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Update caixauso Set status = "Utilizado" Where caixauso.codigo = ? and caixauso.posto = ?
       and caixauso.status != "Cancelado"`,

      [req.body.codigo, req.posto.cnpj],

      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        const Response = {
          mensagem: "Abastecimento confirmado",

          CaixaUsoAtualizado: {
            Codigo: req.body.codigo,
            StatusAtualizado: result.status,
          },
        };
        return res.status(202).json(Response);
      }
    );
  });
};
