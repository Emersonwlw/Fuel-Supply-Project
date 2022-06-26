const mysql = require("../mysql").pool;
const mysql2 = require("../mysql");

exports.postcompra = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Insert into compracredito (usuario, posto, combustivel, valorcombustivel, data, litros, valortotal, status, datauso)
            values (?,?,?,?,?,?,?,"Disponivel",?)`,

      [
        req.usuario.cpf,
        req.body.posto,
        req.body.combustivel,
        req.body.valorcombustivel,
        req.body.data,
        req.body.litros,
        req.body.valortotal,
        req.body.datauso,
      ],

      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        const Response = {
          mensagem: "Compra registrada com sucesso",
          CompraEfetuada: {
            codigo: result.codigo,
            usuario: req.body.usuario,
            posto: req.body.posto,
            combustivel: req.body.combustivel,
            valorcombustivel: req.body.valorcombustivel,
            data: req.body.data,
            litros: req.body.litros,
            valortotal: req.body.valortotal,
            status: req.body.status,
            datauso: req.body.datauso,
          },
        };

        return res.status(200).json(Response);
      }
    );
  });
};

exports.getcomprausuario = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Select compracredito.codigo, compracredito.usuario as cpf, usuario.nome as cliente, compracredito.posto as cnpj, posto.razaosocial as posto, compracredito.combustivel,
            compracredito.valorcombustivel,  DATE_FORMAT(compracredito.data ,'%d/%m/%Y')as data, compracredito.litros, compracredito.valortotal, compracredito.status
            from compracredito join usuario
            on compracredito.usuario = usuario.cpf
            join posto
            on compracredito.posto = posto.cnpj
            where compracredito.status = "Disponivel" and compracredito.usuario = ?;`,

      [req.usuario.cpf],

      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhuma compra com este CPF",
          });
        }

        const Response = {
          compracredito: result.map((cpcr) => {
            return {
              codigo: cpcr.codigo,
              cpf: cpcr.cpf,
              cliente: cpcr.cliente,
              cnpj: cpcr.cnpj,
              posto: cpcr.posto,
              combustivel: cpcr.combustivel,
              valorcombustivel: cpcr.valorcombustivel,
              data: cpcr.data,
              litros: cpcr.litros,
              valortotal: cpcr.valortotal,
              status: cpcr.status,
              datauso: cpcr.datauso,
            };
          }),
        };

        return res.status(200).json(Response);
      }
    );
  });
};

exports.getCarteiraPosto = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Select compracredito.usuario as cpf, usuario.nome as cliente, compracredito.posto as postocnpj, 
			posto.razaosocial as posto, posto.endereco, posto.numendereco, sum(compracredito.valortotal) as valorcarteira, sum(compracredito.litros) as litroscarteira
            from compracredito join usuario
            on compracredito.usuario = usuario.cpf
            join posto
            on compracredito.posto = posto.cnpj
            where compracredito.status = "Disponivel" and compracredito.usuario = ?
            group by compracredito.usuario, usuario.nome, compracredito.posto, 
			posto.razaosocial, posto.endereco, posto.numendereco`,

      [req.usuario.cpf],

      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhuma compra com este CPF",
          });
        }

        const Response = {
          compracredito: result.map((cpcr) => {
            return {
              cpf: cpcr.cpf,
              cliente: cpcr.cliente,
              cnpj: cpcr.postocnpj,
              posto: cpcr.posto,
              endereco: cpcr.endereco,
              numendereco: cpcr.numendereco,
              valorcarteira: cpcr.valorcarteira,
              litroscarteira: cpcr.litroscarteira,
            };
          }),
        };

        return res.status(200).json(Response);
      }
    );
  });
};

exports.getCompraUsuarioPostof = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Select compracredito.codigo, compracredito.usuario as cpf, usuario.nome as cliente, compracredito.posto as postocnpj, 
			      posto.razaosocial as posto, compracredito.combustivel, combustivel.nome as nomecomb,
            compracredito.valorcombustivel,  DATE_FORMAT(compracredito.data ,'%d/%m/%Y')as data,
            compracredito.litros, compracredito.valortotal, compracredito.status
            from compracredito join usuario
            on compracredito.usuario = usuario.cpf
            join posto
            on compracredito.posto = posto.cnpj
            join combustivel
            on compracredito.combustivel = combustivel.codigo
            where compracredito.status = "Disponivel" and compracredito.usuario = ?
            and compracredito.posto = ? and combustivel.nome like ?`,

      [req.usuario.cpf, req.body.cnpj, req.body.combustivel],

      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhuma compra com este CPF",
          });
        }

        const Response = {
          posto: {
            postocnpj: result[0].postocnpj,
            postorazo: result[0].posto,
          },

          cliente: {
            clientecpf: result[0].cpf,
            clientenome: result[0].cliente,
          },

          compracredito: result.map((cpcr) => {
            return {
              codigo: cpcr.codigo,
              cpf: cpcr.cpf,
              cliente: cpcr.cliente,
              cnpj: cpcr.postocnpj,
              posto: cpcr.posto,
              combustivel: cpcr.combustivel,
              nomecomb: cpcr.nomecomb,
              valorcombustivel: cpcr.valorcombustivel,
              data: cpcr.data,
              litros: cpcr.litros,
              valortotal: cpcr.valortotal,
              status: cpcr.status,
            };
          }),
        };

        return res.status(200).json(Response);
      }
    );
  });
};

exports.getCompraUsuarioPosto = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Select compracredito.codigo, compracredito.usuario as cpf, usuario.nome as cliente, compracredito.posto as postocnpj, 
			posto.razaosocial as posto, compracredito.combustivel,
            compracredito.valorcombustivel,  DATE_FORMAT(compracredito.data ,'%d/%m/%Y')as data,
            compracredito.litros, compracredito.valortotal, compracredito.status
            from compracredito join usuario
            on compracredito.usuario = usuario.cpf
            join posto
            on compracredito.posto = posto.cnpj
            where compracredito.status = "Disponivel" and compracredito.usuario = ? 
            and compracredito.posto = ?`,

      [req.usuario.cpf, req.body.cnpj],

      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).json({ error: error });
        }

        if (result.length == 0) {
          return res.status(404).json({
            mensagem: "Não foi encontrado nenhuma compra com este CPF",
          });
        }

        const Response = {
          posto: {
            postocnpj: result[0].postocnpj,
            postorazo: result[0].posto,
          },

          cliente: {
            clientecpf: result[0].cpf,
            clientenome: result[0].cliente,
          },

          compracredito: result.map((cpcr) => {
            return {
              codigo: cpcr.codigo,
              cpf: cpcr.cpf,
              cliente: cpcr.cliente,
              cnpj: cpcr.postocnpj,
              posto: cpcr.posto,
              combustivel: cpcr.combustivel,
              valorcombustivel: cpcr.valorcombustivel,
              data: cpcr.data,
              litros: cpcr.litros,
              valortotal: cpcr.valortotal,
              status: cpcr.status,
            };
          }),
        };

        return res.status(200).json(Response);
      }
    );
  });
};

exports.updatecompraproc = async (req, res, next) => {
  console.log(req.usuario);

  try {
    const usos = req.body.array.map((array) => [array.codigo]);
    //setar compras de credito para utilizado somente as que o status = em processo
    query = `Update compracredito set status = "Em processo" where codigo in (?) and usuario = ?`;
    //validar para não processar compra utilizada ou cancelada
    const results = await mysql2.execute(query, [usos, req.usuario.cpf]);
    const response = {
      message: "Gravado",
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }

  // mysql.getConnection((error, conn) => {
  //   if (error) {
  //     return res.status(500).json({ error: error });
  //   }

  //   conn.query(
  //     `Update compracredito
  //              set  usuario =?,
  //                   posto =?,
  //                   combustivel =?,
  //                   valorcombustivel =?,
  //                   data =?,
  //                   litros =?,
  //                   valortotal =?,
  //                   status =?,
  //                   datauso =?
  //                   where = codigo =?`,

  //     [
  //       req.body.usuario,
  //       req.body.posto,
  //       req.body.combustivel,
  //       req.body.valorcombustivel,
  //       req.body.data,
  //       req.body.litros,
  //       req.body.valortotal,
  //       req.usuario.cpf,
  //       req.body.status,
  //       req.body.datauso,
  //     ],

  //     (error, result, field) => {
  //       conn.release();

  //       if (error) {
  //         return res.status(500).json({ error: error });
  //       }

  //       const Response = {
  //         mensagem: "Compra atualizada com sucesso",

  //         Compraatualizada: {
  //           codigo: req.body.codigo,
  //           usuario: req.body.usuario,
  //           posto: req.body.posto,
  //           combustivel: req.body.combustivel,
  //           valorcombustivel: req.body.valorcombustivel,
  //           data: req.body.data,
  //           litros: req.body.litros,
  //           valortotal: req.body.valortotal,
  //           status: req.body.status,
  //           datauso: req.body.datauso,
  //         },
  //       };
  //       return res.status(202).json(Response);
  //     }
  //   );
  // });
};

exports.updatecompracanc = async (req, res, next) => {
  console.log(req.usuario);

  try {
    const usos = req.body.array.map((array) => [array.codigo]);
    //setar compras de credito para utilizado somente as que o status = em processo
    query = `Update compracredito set status = "Cancelado" where codigo in (?) and usuario = ?`;
    //validar para não cancelar compra utilizada ou em processo
    const results = await mysql2.execute(query, [usos, req.usuario.cpf]);
    const response = {
      message: "Gravado",
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updatecomprauti = async (req, res, next) => {
  req.usuario;

  try {
    const usos = req.body.array.map((array) => [array.credito]);
    //setar compras de credito para utilizado somente as que o status = em processo
    query = `Update compracredito set status = "Utilizado" where codigo in (?) and usuario = ?`;
    //validar para nãu utilizar compra cancelada
    const results = await mysql2.execute(query, [usos, req.usuario.cpf]);
    const response = {
      message: "Gravado",
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getfinalizacao = async (req, res, next) => {
  req.usuario;
  try {
    const usos = req.body.array.map((array) => [array.codigo]);
    //setar compras de credito para utilizado somente as que o status = em processo
    query = ` select compracredito.codigo, combustivel.nome, compracredito.litros, compracredito.valortotal
                    from compracredito join combustivel
                    on compracredito.combustivel = combustivel.codigo
                    where compracredito.codigo in (?) and compracredito.usuario = ?
                    group by compracredito.codigo`;

    //validar para nãu utilizar compra cancelada
    const results = await mysql2.execute(query, [usos, req.usuario.cpf]);
    const response = {
      message: "Ok",
      compracredito: results.map((cpcr) => {
        return {
          codigo: cpcr.codigo,
          combustivel: cpcr.nome,
          litros: cpcr.litros,
          valortotal: cpcr.valortotal,
        };
      }),

    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deletcompra = (req, res, next) => {
  console.log(req.usuario);

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).json({ error: error });
    }

    conn.query(
      `Delete from compracredito where compracredito.codigo = ? AND compracredito.usuario = ?`,

      [req.body.codigo, req.usuario.cpf],

      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).json({ error: error });
        }

        const Response = {
          mensagem: "Compra de credito removida com sucesso",
        };

        res.status(202).json(Response);
      }
    );
  });
};
