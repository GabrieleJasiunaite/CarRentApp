import Car from '../models/carModel.js'
import mongoose from 'mongoose'

export const getCars = async (req, res) =>{
    const cars = await Car.find({}).sort({})//papildyti pagal ka sortinsim
    res.status(200).json(cars)
}
export const getCar = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Tokio automobilio nera"})
    }
    const car = await Car.findById(id)

    if(!car){
        return res.status(404).json({error: 'Tokio automobilio nera.'})

    }
    res.status(200).json(car)
}

 export const createCar = async (req, res) => {
    const{imageUrl, model, brand, price, year, fuelType, transmission, seats, body} = req.body
    let emptyFields = []
    if (!imageUrl){emptyFields.push('imageUrl')}
    if (!model){emptyFields.push('model')}//cia reiks papildyti
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Prasome uzpildyt visus laukelius', emptyFields})
    }
    try{
        const car = await Car.create({imageUrl, model, brand, price, year, fuelType, transmission, seats, body})
        res.status(200).json(car)
    } catch(error){
        res.status(400).json({error: error.message})
    }
   
}

export const updateCar = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Tokio automobilio nera'})
    }
    // const car = await Car.findOneAndUpdate({_id:id},{$set:{likes:likes}},{new: true})
    // if(!car) {
    //     return res.status(404).json({error: ''})
    // }
    // res.status(200).json(car)
}

export const removeCar = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Tokio automobilio nera'})
    }
    const car = await Car.findByIdAndDelete({_id: id})
    if(!car) {
        return res.status(404).json({error:'Tokio automobilio nera nera.'})
    }
    res.status(200).json(car)
}
