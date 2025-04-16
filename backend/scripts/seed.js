// scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/product.Model.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

await Product.deleteMany();

const sampleProducts = [
  {
    name: 'Organic Cotton Pads',
    description: 'Soft, organic cotton for sensitive skin.',
    price: 199,
    category: 'Pads',
    stock: 100,
    images: [{ public_id: 'pad1', url: 'https://via.placeholder.com/200x200.png?text=Pad+1' }],
    user: new mongoose.Types.ObjectId(), // replace with real user ID in production
  },
  {
    name: 'Reusable Menstrual Cup',
    description: 'Eco-friendly, reusable cup for up to 12 hours.',
    price: 499,
    category: 'Cups',
    stock: 50,
    images: [{ public_id: 'cup1', url: 'https://via.placeholder.com/200x200.png?text=Cup' }],
    user: new mongoose.Types.ObjectId(),
  },
];

await Product.insertMany(sampleProducts);
console.log('Database seeded');
process.exit();
