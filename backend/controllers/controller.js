import Car from '../models/carModel.js';
import mongoose from 'mongoose';

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json(cars);
    } catch (err) {
        return res.status(500).send('Serverio klaida')
    };
};

export const getCar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Tokio automobilio nėra" })
    };

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ error: 'Tokio automobilio nėra.' })
        };
        res.status(200).json(car);
    } catch (err) {
        return res.status(500).send('Serverio klaida');
    };
};

export const createCar = async (req, res) => {
    const { imageUrl, model, brand, price, year, fuelType, transmission, seats, body } = req.body;
    let emptyFields = [];
    if (!imageUrl || imageUrl === "") { emptyFields.push('paveikslėlio nuoroda') };
    if (!model || model === "") { emptyFields.push('modelis') };
    if (!brand || brand === "") { emptyFields.push('markė') };
    if (!price) { emptyFields.push('kaina') };
    if (!year) { emptyFields.push('metai') };
    if (!fuelType || fuelType === "") { emptyFields.push('kuro tipas') };
    if (!transmission || transmission === "") { emptyFields.push('pavarų dėžė') };
    if (!seats) { emptyFields.push('vietos') };
    if (!body || body === "") { emptyFields.push('kėbulas') };

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields });
    };
    try {
        const car = await Car.create({ imageUrl, model, brand, price, year, fuelType, transmission, seats, body });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).send('Serverio klaida');
    };
};

export const updateCar = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokio automobilio nėra' });
    };

    const { imageUrl, model, brand, price, year, fuelType, transmission, seats, body } = req.body;
    let emptyFields = [];
    if (!imageUrl || imageUrl === "") { emptyFields.push('paveikslėlio nuoroda') };
    if (!model || model === "") { emptyFields.push('modelis') };
    if (!brand || brand === "") { emptyFields.push('markė') };
    if (!price) { emptyFields.push('kaina') };
    if (!year) { emptyFields.push('metai') };
    if (!fuelType || fuelType === "") { emptyFields.push('kuro tipas') };
    if (!transmission || transmission === "") { emptyFields.push('pavarų dėžė') };
    if (!seats) { emptyFields.push('vietos') };
    if (!body || body === "") { emptyFields.push('kėbulas') };

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields });
    };

    try {
        const car = await Car.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        if (!car) {
            return res.status(404).json({ error: 'Tokio automobilio nėra' });
        };
        res.status(200).json(car);
    } catch (err) {
        res.status(500).send('Serverio klaida');
    };
};

export const removeCar = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokio automobilio nėra' });
    };

    try {
        const car = await Car.findByIdAndDelete({ _id: id });
        if (!car) {
            return res.status(404).json({ error: 'Tokio automobilio nėra.' });
        };
        res.status(200).json(car);
    } catch (err) {
        res.status(500).send('Serverio klaida');
    };
};

export const getTypes = async (req, res) => {
    try {
        const types = await Car.aggregate([
            { $unwind: "$body" },
            { $group: { _id: "$body" } }
        ]);

        return res.status(200).json(types);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Serverio klaida");
    };
};
