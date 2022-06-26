const mysql = require("../mysql").pool;
const mysql2 = require("../mysql");

exports.postcaixausocredito = async (req, res, next) => {
  console.log(req.usuario);
  let status = "Ativo";
  try {
    const usoval = req.body.array.map((array) => [array.credito]);
    const usos = req.body.array.map((array) => [
      array.codigocaixauso,
      req.usuario.cpf,
      array.posto,
      status,
      array.credito,
    ]);
    query2 = `select * from heroku_dda77219f4d192a.compracredito where codigo in (?) and status = "Disponivel"`;
    let result2 = await mysql2.execute(query2, [usoval]);
    console.log(result2.length + " " + usoval.length);
    console.log(result2.length == usoval.length);
    console.log("##" + JSON.stringify(result2));
    console.log("##" + JSON.stringify(usoval));
    if (result2.length == usoval.length) {
      query = `Insert into caixausocredito (codigocaixauso, usuario, posto, status, credito) values ?`;
      const result = await mysql2.execute(query, [usos]);
      //update na compra credito setando o status de cada uso de credito para em processo, caso o
      // usuario cancele o uso volta para disponivel se nao seta para utilizado
      const Response = {
        message: "Registrado",
        creditos_registrados: req.body.array.map((array) => [
          {
            codigo: array.codigocaixauso,
            posto: array.posto,
            credito: array.credito,
          },
        ]),
      };
      return res.status(200).json({ mensagem: Response });
    } else {
      return res.status(500).json({
        error:
          "Não foi possivel gravar o seu por favor verifique os créditos selecionado " +
          error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error:
        "Não foi possivel gravar o seu por favor verifique os créditos selecionado " +
        error,
    });
  }
};

exports.updatecaixausocreditouser = async (req, res, next) => {
  req.usuario;

  try {
    const usos = req.body.array.map((array) => [array.lista_codigo]);
    //aqui ele só cancela o uso do credito e retorna a compra de credito para disponivel
    //apenas para cancelar o uso
    query = `Update caixausocredito Set status = "Cancelado" Where caixausocredito.codigo in (?) and caixausocredito.usuario = ?
    and caixausocredito.status = "Ativo"`;
    const results = await mysql2.execute(query, [usos, req.usuario.cpf]);
    const response = {
      message: "Gravado",
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updatecaixausocreditoposto = async (req, res, next) => {
  //apenas para registrar o uso do credito pelo checkout do posto
  req.posto;
  try {
    const usos = req.body.array.map((array) => [array.lista_codigo]);
    //setar compras de credito para utilizado somente as que o status = em processo
    query = `Update caixausocredito Set status = "Utilizado" Where caixausocredito.codigo in (?) 
          and caixausocredito.posto = ?
          and caixausocredito.status != "Cancelado" `;
    const results = await mysql2.execute(query, [usos, req.posto.cnpj]);
    const response = {
      message: "Gravado",
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
