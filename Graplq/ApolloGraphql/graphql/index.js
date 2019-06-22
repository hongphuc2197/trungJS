const graphQlHttp = require('express-graphql')

const graphQlSchema = require('./schema')
const graphQlrootValue = require('./rootValue')
module.exports = () => {
  return graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlrootValue,
    graphiql: true
  })
}