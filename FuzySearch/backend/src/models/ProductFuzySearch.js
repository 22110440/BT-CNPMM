import mongoose from 'mongoose';
import { normalizeVN } from '../utils/normalize.js';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameNormalized: { type: String, index: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

// Tự động set nameNormalized khi save
ProductSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.nameNormalized = normalizeVN(this.name);
  }
  next();
});

// TEXT index cho full-text search
ProductSchema.index(
  { name: 'text', description: 'text' },
  {
    weights: { name: 10, description: 1 },
    default_language: 'none'
  }
);

// Index prefix cho name và cho nameNormalized
ProductSchema.index({ name: 1 });
ProductSchema.index({ nameNormalized: 1 });

export const productFuzySearch = mongoose.model('productFuzySearch', ProductSchema, 'products');
