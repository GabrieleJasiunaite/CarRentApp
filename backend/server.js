import express from 'express'
import dotenv from 'dotenv'
import carsRoutes from './routes/cars.js'
import mongoose from 'mongoose'
import userRouts from './routes/user.js'

dotenv.config()

//express app
 const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//routes
app.use('/api/cars', carsRoutes)

app.use('/api/user', userRouts)

//connect to DB
mongoose.connect(process.env.URI)
 .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
    })
 })
 .catch((err) => console.log(err))
