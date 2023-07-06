import express from 'express';
import asyncHandler from 'express-async-handler';
import { ProdModel } from '../model/prodModel';

export const productRouter = express.Router();


productRouter.get('/', asyncHandler(async (req, res) => {
    
    const products = await ProdModel.find()
    res.json(products)
    
}))
productRouter.get('/slug/:slug', asyncHandler(async (req, res) => {
    const product = await ProdModel.findOne({slug: req.params.slug})
    product ? res.json(product) : res.status(404).json({message: 'Product not found'})
}))


productRouter.post('/api/products', async (req, res) => {
    const newProduct = req.body
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json({message: 'Успешно добавлен', product: savedProduct})
    }
    catch (err){
        console.error('Ошибка', err)
        res.status(500).json({error: "Ошибка при сохранении"})
    }
})




