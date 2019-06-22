const crypto = require('crypto')
const db = {
  users: [
    {_id: 1, email:"test@test.com", name: 'Alex'},
    {_id: 2, email:"test2@test.com", name: 'Max'}
  ],
  messages: [
    {_id:1, userId: 1, body:'hello', createAt: Date.now()},
    {_id:2, userId: 2, body:'hi', createAt: Date.now()},
    {_id:3, userId: 3, body:'what\'up', createAt: Date.now()},
  ]
}

class User{
  constructor(user){
    Object.assign(this,user)
  }

  messages () {
    return db.messages.filter(message => {
     return message.userId === this._id 
    })
  }
}

module.exports = {
  users: () => db.users.map(user => new User(user)),
  messages: () => {
    return db.messages
  } ,

  addUser: (args, req) => { 
    const user = {
      _id: crypto.randomBytes(10).toString(),
      email: args.email,
      name: args.name
    }
    db.users.push(user)
    return user
  },

  user: (args) => {
    const user =  db.users.find(user => user._id==args.id)
    console.log(user)
    return user
  },
}