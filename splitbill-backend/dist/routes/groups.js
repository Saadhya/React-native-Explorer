"use strict";
const express = require('express');
const store = require('../data/store');
const groupRouter = express.Router();
groupRouter.post('/', (req, res) => {
    const { name, members } = req.body;
    const group = { id: Date.now().toString(), name, members };
    store.groups.push(group);
    res.status(201).json(group);
});
module.exports = groupRouter;
