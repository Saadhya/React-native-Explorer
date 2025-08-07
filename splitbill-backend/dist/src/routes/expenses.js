"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_1 = require("../data/store");
const router = express_1.default.Router();
router.post('/', (req, res) => {
    const { groupId, paidBy, amount, description } = req.body;
    const group = store_1.store.groups.find(g => g.id === groupId);
    if (!group)
        return res.status(404).json({ error: 'Group not found' });
    const splitAmount = amount / group.members.length;
    group.members.forEach(member => {
        if (member !== paidBy) {
            store_1.store.balances[paidBy] = store_1.store.balances[paidBy] || {};
            store_1.store.balances[paidBy][member] = (store_1.store.balances[paidBy][member] || 0) + splitAmount;
            store_1.store.balances[member] = store_1.store.balances[member] || {};
            store_1.store.balances[member][paidBy] = (store_1.store.balances[member][paidBy] || 0) - splitAmount;
        }
    });
    const expense = { id: Date.now().toString(), groupId, paidBy, amount, description };
    store_1.store.expenses.push(expense);
    res.status(201).json(expense);
});
router.get('/balances', (req, res) => {
    res.json(store_1.store.balances);
});
exports.default = router;
