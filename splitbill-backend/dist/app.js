"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const users_1 = __importDefault(require("./routes/users"));
const groups_1 = __importDefault(require("./routes/groups"));
const expenses_1 = __importDefault(require("./routes/expenses"));
app.use('/users', users_1.default);
app.use('/groups', groups_1.default);
app.use('/expenses', expenses_1.default);
app.listen(PORT, () => {
    console.log(`Splitwise backend running on http://localhost:${PORT}`);
});
