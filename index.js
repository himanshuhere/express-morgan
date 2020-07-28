const express = require('express'),
    http = require('http'),
    morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3100;

const app = express();

// for using express middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// For dishes end point
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});
app.get('/dishes', (req, res, next) => {
    res.end('Will display you all the dishes!');
});
app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish with name ' + req.body.name + ' and details : ' + req.body.description);
});
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported.');
});
app.delete('/dishes', (req, res, next) => {
    res.end('will delete all the dishes (authenticated access to this operation)');
});

// For dishes:dishId parameter end point
app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will display you the dish : ' + req.params.dishId);
});
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported. You cannot add dishes to database. Thankyou!');
});
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating dish :' + req.params.dishId + '\n');
    res.end('Will show you updated dish : ' + req.body.name + ' and details : ' + req.body.description);
});
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('will delete teh dish ' + req.params.dishId);
});

// For morgan helping logging to serve static html files in public fol
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hi this is express running..</h1></body></html>');
});

//server 
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port} ...`);
});