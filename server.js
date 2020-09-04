/*const customExpress = require('./config/custom-express')*/
const {GraphQLServer} = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')

//const app = customExpress()

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente');

const resolvers = {
  Query: {
    status: () => "Servidor rodando",
    clientes: () => Clientes.lista()
  },
  Mutation: {
    adicionaCliente: (root, params) => 
    Clientes.adiciona(params)
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
