const express = require('express');
const { seedElements } = require('./utils');

const expressionsRouter = express.Router();

const expressions = [];
seedElements(expressions, 'expressions');



module.exports = expressionsRouter;