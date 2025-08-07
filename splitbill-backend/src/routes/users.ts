import express from 'express';
import { store, User } from '../data/store';

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  const user: User = { id: Date.now().toString(), name };
  store.users.push(user);
  res.status(201).json(user);
});

export default router;