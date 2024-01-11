import Reservation from '../models/reservationModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';



// Controller function to get reservations based on user role (admin or regular user)
export const getReservations = async (req, res) => {
    const user_id = req.user._id;
    const userCheck = await User.findById(user_id);

    if (userCheck.isAdmin) {
        try {
            const reservations = await Reservation.find({}).sort({ dateRented: -1 });
            res.status(200).json(reservations);
        } catch (err) {
            return res.status(500).send('Serverio klaida');
        };
    } else {
        try {
            const reservations = await Reservation.find({ user_id }).sort({ dateRented: -1 });
            res.status(200).json(reservations);
        } catch (err) {
            return res.status(500).send('Serverio klaida');
        };
    };
};

// Controller function to get a single reservation by ID
export const getReservation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Tokios rezervacijos nėra" });
    };

    try {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Tokios rezervacijos nėra' });
        };
        res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).send('Serverio klaida');
    };
};

// Controller function to create a new reservation
export const createReservation = async (req, res) => {
    const { car_id, carTitle, dateRented, dateReturned } = req.body;

    let emptyFields = [];

    if (!car_id || car_id === "") { emptyFields.push('pasirinkite automobilį') };
    if (!carTitle || carTitle === "") { emptyFields.push('pasirinkite automobilį') };
    if (!dateRented) { emptyFields.push('pasirinkite nuomos datą') };
    if (!dateReturned) { emptyFields.push('pasirinkite grąžinimo datą') };
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields })
    };

    try {
        const user = req.user._id;
        const userObj = await User.findById(user);
        const reservation = await Reservation.create({ car_id, carTitle, dateRented, dateReturned, user_id: user, email: userObj.email, status: 'laukiama' });
        res.status(200).json(reservation);
    } catch (error) {
        return res.status(500).json('Serverio klaida');
    };
};
// Controller function to update an existing reservation
export const updateReservation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokios rezervacijos nėra' })
    }

    const { car_id, carTitle, dateRented, dateReturned, status } = req.body;

    let emptyFields = [];

    if (!car_id || car_id === "") { emptyFields.push('pasirinkite automobilį') };
    if (!carTitle || carTitle === "") { emptyFields.push('pasirinkite automobilį') };
    if (!dateRented) { emptyFields.push('pasirinkite nuomos datą') };
    if (!dateReturned) { emptyFields.push('pasirinkite grąžinimo datą') };
    if (status !== 'pending' || status !== 'confirmed' || status !== 'cancelled' || status !== 'completed') { emptyFields.push('pasirinkite statusą') };
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields })
    };

    try {
        const reservation = await Reservation.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        if (!reservation) {
            return res.status(404).json({ error: 'Paredaguoti rezervacijos nepavyko' })
        }
        res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).json('Serverio klaida');
    };
};
// Controller function to remove a reservation by ID
export const removeReservation = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokios rezervacijos nėra' });
    };

    try {
        const reservation = await Reservation.findByIdAndDelete({ _id: id });
        if (!reservation) {
            return res.status(404).json({ error: 'Tokios rezervacijos nėra.' });
        };
        res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).send('Serverio klaida');
    };
};