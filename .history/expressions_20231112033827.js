const express = require('express');
const { seedElements } = require('./utils');

const expressionsRouter = express.Router();

const expressions = [];
seedElements(expressions, 'expressions');

// Get all expressions
app.get('/expressions', (req, res, next) => {
    res.send(expressions);
});

module.exports = expressionsRouter;