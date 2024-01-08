import mongoose from 'mongoose'


const Schema = mongoose.Schema
const reservationSchema = new Schema ({
    car: {
      type: String
    },
    dateRented: {
        type: Date
    },
    dateReturned: {
        type: Date
    },
    user: {
        type: String
    }
})

export default mongoose.model('Reservation', reservationSchema)