const { dateToString } = require('../../helpers')
const { transformEvent, Event, User } = require('./merge')
module.exports = {
  events: async function () {
    try {
      const events = await Event.find() //.populate('creator')
      return events.map(event => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },
  createEvent: async function (args, req) {
    if(!req.isAuth)
      throw new Error('Unauthenticated')
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId
    })
    let createdEvent
    try {
      const res = await event.save()
      createdEvent = transformEvent(res)
      const user = await User.findById(req.userId)

      if (!user)
        throw new Error('User does not exists already')
      user.createdEvents.push(event)
      await user.save()
      return createdEvent
    } catch (err) {
      throw err
    }
  }
}
