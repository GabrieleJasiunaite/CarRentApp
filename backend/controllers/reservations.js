import Reservation from '../models/reservationModel.js'
import mongoose from 'mongoose'

export const getReservations = async (req, res) => {
    const reservations = await Reservation.find({}).sort({})//papildyti pagal ka sortinsim pvz pagal artimiausia nuomos data dateRented
    res.status(200).json(reservations)
}

export const getReservation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Tokios rezervacijos nėra" })
    }

    const reservation = await Reservation.findById(id)

    if (!reservation) {
        return res.status(404).json({ error: 'Tokios rezervacijos nėra' })
    }
    res.status(200).json(reservation)
}

export const createReservation = async (req, res) => {
    const { car, dateRented, dateReturned } = req.body;

    let emptyFields = [];

    if (!car) { emptyFields.push('pasirinkite automobilį') };
    if (!dateRented) { emptyFields.push('pasirinkite nuomos datą') };
    if (!dateReturned) { emptyFields.push('pasirinkite grąžinimo datą') };
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields })
    };

    try {
        const user = req.user._id;
        const reservation = await Reservation.create({ car, dateRented, dateReturned, user, status: 'Laukiama' });
        res.status(200).json(reservation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};

export const updateReservation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokios rezervacijos nėra' })
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
        return res.status(404).json({ error: 'Tokios rezervacijos nėra' })
    }
    const reservation = await Reservation.findByIdAndDelete({ _id: id })
    if (!reservation) {
        return res.status(404).json({ error: 'Tokios rezervacijos nėra.' })
    }
    res.status(200).json(reservation)
};