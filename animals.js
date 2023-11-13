const express = require('express');
const { seedElements } = require('./utils');

const animalsRouter = express.Router();

const animals = [];
seedElements(animals, 'animals');

// Get all animals
animalsRouter.get('/', (req, res, next) => {
    res.send(animals);
});

animalsRouter.get('/animals', (req, res, next) => {
    res.send(animals);
});

animalsRouter.get('/animals/:id', (req, res, next) => {
    const foundAnimal = getElementById(req.params.id, animals);

    if (foundAnimal) {
        res.send(foundAnimal);
    } else {
        res.sendStatus(404);
    }
});

animalsRouter.put('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);

    if (animalIndex !== -1) {
        updateElement(req.params.id, req.query, animals);
        res.send(animals[animalIndex]);
    } else {
        res.sendStatus(404);
    }
});

animalsRouter.post('/animals', (req, res, next) => {
    const newAnimal = createElement('animals', req.query);

    if (newAnimal) {
        animals.push(newAnimal);
        res.status(201).send(newAnimal);
    } else {
        res.sendStatus(400);
    }
});

animalsRouter.delete('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);

    if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = animalsRouter;