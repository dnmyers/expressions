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
app.use('/animals', animalsRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});