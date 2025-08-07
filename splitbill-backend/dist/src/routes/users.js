"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_1 = require("../data/store");
const router = express_1.default.Router();
router.post('/', (req, res) => {
    const { name } = req.body;
    const user = { id: Date.now().toString(), name };
    store_1.store.users.push(user);
    res.status(201).json(user);
});
exports.default = router;
