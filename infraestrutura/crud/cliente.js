const executaQuery = require('../database/queries')

class Cliente {
  lista(res) {
    const sql = 'SELECT * FROM Clientes'

    return executaQuery(sql)
  }

  buscaPorId(res, id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}`

    executaQuery(res, sql)
  }

  adiciona(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql).then(resposta => {
      return ({
        id: resposta.insertId,
        nome,
        cpf
      })
    })
  }

  atualiza(novoItem) {
    const {id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql)
      .then(() => novoItem)
  }

  deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql)
      .then(() => id)
  }
}

module.exports = new Cliente
