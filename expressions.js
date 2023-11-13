const express = require('express');
const { seedElements } = require('./utils');

const expressionsRouter = express.Router();

const expressions = [];
seedElements(expressions, 'expressions');

// Get all expressions
expressionsRouter.get('/expressions', (req, res, next) => {
    res.send(expressions);
});

// Get a single expression
expressionsRouter.get('/expressions/:id', (req, res, next) => {
    const foundExpression = getElementById(req.params.id, expressions);
    if (foundExpression) {
        res.send(foundExpression);
    } else {
        res.sendStatus(404).send();
    }
});

// Update an expression
expressionsRouter.put('/expressions/:id', (req, res, next) => {
    const expressionIndex = getIndexById(req.params.id, expressions);
    if (expressionIndex !== -1) {
        updateElement(req.params.id, req.query, expressions);
        res.send(expressions[expressionIndex]);
    } else {
        res.sendStatus(404);
    }
});

// Create a new expression
expressionsRouter.post('/expressions', (req, res, next) => {
    const receivedExpression = createElement('expressions', req.query);
    if (receivedExpression) {
        expressions.push(receivedExpression);
        res.status(201).send(receivedExpression);
    } else {
        res.sendStatus(400);
    }
});

// Delete an expression
expressionsRouter.delete('/expressions/:id', (req, res, next) => {
    const expressionIndex = getIndexById(req.params.id, expressions);
    if (expressionIndex !== -1) {
        expressions.splice(expressionIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = expressionsRouter;