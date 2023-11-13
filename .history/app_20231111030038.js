const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const { getElementById, getIndexById, updateElement,
    seedElements } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');

const PORT = process.env.PORT || 4001;

app.get('/expressions', (req, res, next) => {
    res.send(expressions);
});

app.get('/expressions/:id', (req, res, next) => {
    const foundExpression = getElementById(req.params.id, expressions);
    if (foundExpression) {
        res.send(foundExpression);
    } else {
        res.status(404).send();
    }
});

app.put('/expressions/:id', (req, res, next) => {
    const expressionUpdates = req.query;
    if (getIndexById(req.params.id, expressions)) {
        updateElement(req.params.id, expressionUpdates, expressions);
        res.status(200).send(expressions[req.params.id]);
    } else {
        res.status(404).send();
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});