const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Query{
      users: [User!]!
      user(id: ID!): User!
      messages: [Message!]!
    }

    type Mutation{
      addUser(email: String!, name: String): User
    }

    type User{
      _id: ID!
      email: String!
      name: String
      avatarUrl: String
      messages: [Message!]!
    }

    type Message{
      _id: ID!
      body: String!
      createAt: String 
    }
`)