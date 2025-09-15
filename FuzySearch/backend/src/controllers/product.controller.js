import { productFuzySearch } from '../models/ProductFuzySearch.js';

export async function createProduct(req, res) {
  try {
    const doc = await productFuzySearch.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function listProducts(req, res) {
  const items = await productFuzySearch.find().sort({ createdAt: -1 }).limit(50);
  res.json(items);
}
