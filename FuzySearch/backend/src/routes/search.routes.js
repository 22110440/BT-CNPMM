import { Router } from 'express';
import { fuzzySearch } from '../controllers/search.controller.js';

const router = Router();

// GET /api/search?q=iphone&page=1&limit=20
router.get('/', fuzzySearch);

export default router;
