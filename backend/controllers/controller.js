import Car from '../models/carModel.js'
import mongoose from 'mongoose'

// Controller function to get all cars
export const getCars = async (req, res) => {
    const cars = await Car.find({}).sort({})//papildyti pagal ka sortinsim
    res.status(200).json(cars)
}

// Controller function to get a single car by ID
export const getCar = async (req, res) => {
    const { id } = req.params
// Check if the provided ID is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Tokio automobilio nėra" })
    }
    const car = await Car.findById(id)
    if (!car) {
        return res.status(404).json({ error: 'Tokio automobilio nėra.' })

    }
    res.status(200).json(car)
}
// Controller function to create a new car
export const createCar = async (req, res) => {
    const { imageUrl, model, brand, price, year, fuelType, transmission, seats, body } = req.body
    let emptyFields = []
    if (!imageUrl) { emptyFields.push('imageUrl') }
    if (!model) { emptyFields.push('model') }//cia reiks papildyti
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields })
    }
    try {
        const car = await Car.create({ imageUrl, model, brand, price, year, fuelType, transmission, seats, body })
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// Controller function to update an existing car
export const updateCar = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokio automobilio nėra' })
    }
    const car = await Car.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    if (!car) {
        return res.status(404).json({ error: '' })
    }
    res.status(200).json(car)
}

// Controller function to remove a car by ID
export const removeCar = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Tokio automobilio nėra' })
    }
    const car = await Car.findByIdAndDelete({ _id: id })
    if (!car) {
        return res.status(404).json({ error: 'Tokio automobilio nėra.' })
    }
    res.status(200).json(car)
}

// Controller function to get unique car body types
export const getTypes = async (req, res) => {
    try {
        const types = await Car.aggregate([
            { $unwind: "$body" },
            { $group: { _id: "$body" } }
        ]);

        return res.status(200).json(types);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    };
};
