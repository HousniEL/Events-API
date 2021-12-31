import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get(`/`, UserController.getAll);
router.post(`/signup`, UserController.insert);
router.post(`/signup`, UserController.signin);
router.put(`/:id`, UserController.update);
router.delete(`/:id`, UserController.delete);

export default router;