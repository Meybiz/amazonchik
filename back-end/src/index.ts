import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import { productRouter } from "./routers/prodRouter";
import { sRouter } from "./routers/seedRout";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";


dotenv.config();
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/amazonchikdb';
mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch(() => {
    console.log('Error DB')
})
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seed', sRouter)


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})
