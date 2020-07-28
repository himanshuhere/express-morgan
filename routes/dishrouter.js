const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will display you all the dishes!');
    })
    .post((req, res, next) => {
        res.end('Will add the dish with name ' + req.body.name + ' and details : ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported.');
    })
    .delete((req, res, next) => {
        res.end('will delete all the dishes (authenticated access to this operation)');
    });

module.exports = dishRouter;