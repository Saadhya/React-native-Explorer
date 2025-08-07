import express from 'express';
import { store, Group } from '../data/store';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, members } = req.body;
  const group: Group = { id: Date.now().toString(), name, members };
  store.groups.push(group);
  res.status(201).json(group);
});

export default router;