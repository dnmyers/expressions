const express = require('express');
const expressionsRouter = require('./expressions.js');
const animalsRouter = require('./animals.js');

const app = express();

const { getElementById, getIndexById, updateElement,
    seedElements, createElement } = require('./utils');

const PORT = process.env.PORT || 4001;

// Serves Express Yourself website
app.use(express.static('files/public'));



app.use('/expressions', expressionsRouter);



app.get('/animals', (req, res, next) => {
    res.send(animals);
});

app.get('/animals/:id', (req, res, next) => {
    const foundAnimal = getElementById(req.params.id, animals);

    if (foundAnimal) {
        res.send(foundAnimal);
    } else {
        res.sendStatus(404);
    }
});

app.put('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);

    if (animalIndex !== -1) {
        updateElement(req.params.id, req.query, animals);
        res.send(animals[animalIndex]);
    } else {
        res.sendStatus(404);
    }
});

app.post('/animals', (req, res, next) => {
    const newAnimal = createElement('animals', req.query);

    if (newAnimal) {
        animals.push(newAnimal);
        res.status(201).send(newAnimal);
    } else {
        res.sendStatus(400);
    }
});

app.delete('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);

    if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});