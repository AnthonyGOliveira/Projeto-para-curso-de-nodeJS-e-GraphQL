/*const customExpress = require('./config/custom-express')*/
const {GraphQLServer} = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')
const { atualiza } = require('./infraestrutura/crud/cliente')

//const app = customExpress()

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente')
const Pets = new Operacoes('pet')

const resolvers = {
  Query: {
    status: () => "Servidor rodando",
    clientes: () => Clientes.lista(),
    cliente: (root, {id}) => Clientes.buscaPorId(id),
    pets: () => Pets.lista(),
    pet: (root, {id}) => Pets.buscaPorId(id)
  },
  Mutation: {
    adicionaCliente: (root, params) => 
    Clientes.adiciona(params),
    atualizaCliente: (root, params) => 
    Clientes.atualiza(params),
    deletaCliente: (root, {id}) => 
    Clientes.deleta(id),

    adicionaPet: (root, params) => 
    Pets.adiciona(params),
    atualizaPet: (root, params) =>
    Pets.atualiza(params),
    deletaPet: (root, {id}) =>
    Pets.deleta(id)
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
