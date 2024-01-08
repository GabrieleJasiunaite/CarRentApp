import Reservation from '../models/reservationModel.js'
import mongoose from 'mongoose'

export const getReservations = async (req, res) => {
    const reservations = await Reservation.find({}).sort({})//papildyti pagal ka sortinsim pvz pagal artimiausia nuomos data dateRented
    res.status(200).json(reservations)
}

export const getReservation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Tokios rezervacijos nera nera" })
    }

    const reservation = await Reservation.findById(id)

    if (!reservation) {
        return res.status(404).json({ error: 'Tokios rezervacijos nera' })
    }
    res.status(200).json(reservation)
}

export const createReservation = async (req, res) => {
    const { car, dateRented, dateReturned, user } = req.body
    let emptyFields = []
    if (!car) { emptyFields.push('car') }
    // if(!dateRented){emptyFields.push('carRented')}
    // if(!dateReturned){emptyFields.push('dateReturned')}
    if (!user) { emptyFields.push('user') }// cia dar reiks apsneket baigus frontend
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prasome uzpildyti visus laukelius', emptyFields })
    }
    try {
        const reservation = await Reservation.create({ car, dateRented, dateReturned, user })
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const updateReservation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokios rezervacijos nera' })
    }
    //papildyt po diskusiju ka norim naujint
    const reservation = await Reservation.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    if (!reservation) {
        return res.status(404).json({ error: '' })
    }
    res.status(200).json(reservation);
};

export const removeReservation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokios rezervacijos nera' })
    }
    const reservation = await Reservation.findByIdAndDelete({ _id: id })
    if (!reservation) {
        return res.status(404).json({ error: 'Tokios rezervacijos nera.' })
    }
    res.status(200).json(reservation)
};