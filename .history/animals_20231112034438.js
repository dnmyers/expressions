const express = require('express');
const { seedElements } = require('./utils');

const animalsRouter = express.Router();

const animals = [];
seedElements(animals, 'animals');

// Get all animals
animalsRouter.get('/', (req, res, next) => {
    res.send(animals);
});