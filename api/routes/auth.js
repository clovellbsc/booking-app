import express, { Router } from 'express';
import { login, register } from '../controllers/auth.js';

const router = Router();

// Create
router.post('/', register);

// Login
router.post('/login', login);

export default router;
