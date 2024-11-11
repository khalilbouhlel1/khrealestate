import express from "express";
import { upload, propertyUpload } from '../middleware/uploadMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { validateProperty } from '../middleware/validateProperty.js';
import { updateProfile, createProperty } from '../controllers/userController.js'
const router = express.Router();

router.put("/update-profile", verifyToken, upload.single('avatar'), updateProfile);
router.post("/add-property", verifyToken, propertyUpload, validateProperty, createProperty);
export default router;

