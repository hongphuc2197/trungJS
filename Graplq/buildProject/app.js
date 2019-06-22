const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/Schema')
const graphQlResolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/is-auth')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization')
  
  if(req.method === 'OPTIONS')
    return res.sendStatus(200)
  next()
})

app.use(isAuth)

app.use(
  '/graphql',
  graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
)


mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-lu7c9.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected')
    app.listen(4000)
  })
  .catch(err => {
    throw err
  })
