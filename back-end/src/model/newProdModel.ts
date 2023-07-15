import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ProductData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  description: string;
  numReviews: number;
  rating: number;
}

export interface ProductDocument extends Document, ProductData {}

const productSchema = new Schema<ProductDocument>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  description: { type: String, required: true },
  numReviews: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const Product: Model<ProductDocument> = mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
