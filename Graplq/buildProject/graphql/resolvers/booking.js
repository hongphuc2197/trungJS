const { transformBooking, transformEvent, Event, Booking , } = require('./merge')
const { dateToString } = require('../../helpers')
module.exports = {
  bookings: async (args, req) => {
    if(!req.isAuth)
      throw new Error('Unauthenticated')
    try {
      const bookings = await Booking.find({user: req.userId}) //.populate('creator')
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    } catch (err) {
      throw err
    }
  },
  bookEvent: async (args, req) => {
    if(!req.isAuth)
      throw new Error('Unauthenticated')
    const fetchedEvent = await Event.findOne({_id: args.eventId})
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent
    })
    const res = await booking.save()
    return {
      ...res._doc,
      createdAt: dateToString(res._doc.createdAt),
      updatedAt: dateToString(res._doc.updatedAt)
    }
  },
  cancelBooking: async (args, req) => {
    if(!req.isAuth)
      throw new Error('Unauthenticated')
    try{
      const booking = await Booking.findById(args.bookingId)
                                   .populate('event')
      const event = transformEvent(booking._doc.event)
      await Booking.deleteOne({_id: args.bookingId})
      return event
    }catch(err){
      throw err
    }
  }
}
