# Esse projeto é um *desafio* de um Sistema de **Banco Digital** (Simplificado) onde eu vou desenvolve-lo e ganhar uma ***cadeira Gamer*** e uma ***Alexa***.

## [Acesse este projeto Online](34.95.186.221)
#

## Requisitos Não Funcionais

- [ ] (Todos) Arquivos postman, insomnia, (no meu caso) HTTP
- [ ] (Toda) Documentação [README.md](README.md)
- Tecnologias que foram usadas
  - NodeJS
  - Express
  - MongoDB
  - Mongoose
- Depêndencias
  - dotenv
  - express
  - jsonwebtoken
  - mongoose
  - EsLint
  - Nodemon
  - eslint-config-google
  - eslint-plugin-node
  - eslint-plugin-promise

- Orientação para levantar o ambiente da aplicação

#

## Requisitos funcionais
- [X] Criação do Cliente e Conta
- [X] Autenticação do Cliente
- [ ] Depósito
- [ ] Saque
- [ ] Transferências entre contas
- [ ] Pagamento de Despesas
- [ ] Consulta de Saldo
- [ ] Geração de Extrato

# Mongo.connect
## Conectar-se ao MongoDB

### Para você conseguir se conectar com o mongo basta apenas criar um arquivo *.env* na raiz do projeto

## Dentro do arquivo insira o linha:
```
CONNECTIONDB=mongodb://127.0.0.1:27017/megabank
```

## *Para isso você precisa ter o MongoDB instalado na sua maquina*

Caso não tenha, e não queira instalar você pode usar o [Mongo Atlas](https://www.mongodb.com/atlas/database?tck=docs_server)

### [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### [Install MongoDB in Arch Linux](https://wiki.archlinux.org/title/MongoDB)

#### caso *instale* o mongo e não consiga acessar o shell do mesmo, reinicie o seu computador isso funcionou comigo.

# Para conseguir Acessar os arquivos http e usa-los, baixe a extenção REST Client do VSCode (semelhante ao insomnia ou postman)

![Essa Extenção aí hehehehe!](images/REST-Client.png)
