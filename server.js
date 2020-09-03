/*const customExpress = require('./config/custom-express')*/
const {GraphQLServer} = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

//const app = customExpress()

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const resolvers = {
  Query: {
    status: () => "Servidor rodando"
  }
}

const sevidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

sevidor.start(() => {
  console.log('Servidor rodando')
})

/*app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000')
})*/
