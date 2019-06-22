const express = require('express')
const graphql = require('./graphql')
const app = express()

app.use('/graphql',graphql())

app.listen(3000, () => console.log('Listening port 3000'))