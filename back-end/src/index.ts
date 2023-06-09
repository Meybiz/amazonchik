import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import path from 'path'
import mongoose from "mongoose";
import { productRouter } from "./routers/prodRouter";
import { sRouter } from "./routers/seedRout";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";
import Product from "./model/newProdModel";


dotenv.config();
const app = express();
const MONGODB_URI = process.env.MONGODB_URI_REMOTE || 'mongodb://localhost/amazonchikdb';
mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
    console.log(MONGODB_URI)
}).catch(() => {
    console.log('Error DB')
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/seed', sRouter)

app.use(express.static(path.join(__dirname,'../../front-end/dist')))

app.get('/api/products', async (req, res) => {
    const searchResult = req.body
    try {
        res.status(200).json({message: 'ПОИИИСК', products: searchResult})
    } catch (err){
        console.error('Ошибка', err)
        res.status(500).json({error: "Ошибка при поиске"})
    }
})

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../front-end/dist/index.html'))
})

app.post('/api/products', async (req, res) => {
    const newProduct = req.body
    try {
        const product = new Product(newProduct)
        const savedProduct = await product.save()
        res.status(200).json({message: 'Успешно добавлен', product: savedProduct})
    }
    catch (err){
        console.error('Ошибка', err)
        res.status(500).json({error: "Ошибка при сохранении"})
    }
})

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10) ;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})



