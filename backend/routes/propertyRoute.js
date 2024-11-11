import express from 'express';
import { getProperties, getPropertyById, updateProperty, deleteProperty, getUserProperties } from '../controllers/propertyController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { propertyUpload } from '../middleware/uploadMiddleware.js';
import { validateProperty } from '../middleware/validateProperty.js';
import { toggleWishlist, getWishlist } from '../controllers/userController.js';
const router = express.Router();

router.get('/all', getProperties);
router.get('/user', verifyToken, getUserProperties);
router.get('/wishlist', verifyToken, getWishlist);
router.get('/:id', getPropertyById);
router.put('/:id', verifyToken, propertyUpload, validateProperty, updateProperty);
router.delete('/:id', verifyToken, deleteProperty);
router.post('/:id/wishlist', verifyToken, toggleWishlist);
export default router; 