"use strict";
const expressLib = require('express');
const store = require('../data/store');
const userRouter = expressLib.Router();
userRouter.post('/', (req, res) => {
    const { name } = req.body;
    const user = { id: Date.now().toString(), name };
    store.users.push(user);
    res.status(201).json(user);
});
module.exports = userRouter;
