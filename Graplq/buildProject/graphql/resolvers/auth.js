const bcrypt = require('bcryptjs')
const { transformUser, User } = require('./merge')
const jwt = require('jsonwebtoken')
module.exports = {
  createUser: async function (args) {
    try {
      const user = await User.findOne({ email: args.userInput.email })
      if (user) throw new Error('User exists already')

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const res = await newUser.save()
      return transformUser(res)
    } catch (err) {
      throw err
    }
  },
  login: async (args) => {
    const user = await User.findOne({ email: args.email })
    if (!user)
      throw new Error("User dose not exists")
    const isEqual = await bcrypt.compare(args.password, user.password)
    if (!isEqual)
      throw new Error("Password is not correctly!")
    const token = jwt.sign({ userId: user.id, email: user.email }, 'somesupersecretkey', {
      expiresIn: '1h'
    })
    return { userId: user.id, token: token, tokenExpiration: 1 }
  }
}
