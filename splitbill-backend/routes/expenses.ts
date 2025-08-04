import express from 'express';
import { store, Expense } from '../data/store';

const router = express.Router();

router.post('/', (req, res) => {
  const { groupId, paidBy, amount, description } = req.body;
  const group = store.groups.find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  const splitAmount = amount / group.members.length;
  group.members.forEach(member => {
    if (member !== paidBy) {
      store.balances[paidBy] = store.balances[paidBy] || {};
      store.balances[paidBy][member] = (store.balances[paidBy][member] || 0) + splitAmount;

      store.balances[member] = store.balances[member] || {};
      store.balances[member][paidBy] = (store.balances[member][paidBy] || 0) - splitAmount;
    }
  });

  const expense: Expense = { id: Date.now().toString(), groupId, paidBy, amount, description };
  store.expenses.push(expense);
  res.status(201).json(expense);
});

router.get('/balances', (req, res) => {
  res.json(store.balances);
});

export default router;