var express = require('express');
require('dotenv').config();
const port = process.env.PORT;

// Import des routes
var routes = require('./Routes/routes')
var routesAuth = require('./Auth/auth.routes')

var mongoose = require('mongoose');

// URL de connexion à la bdd mLab
var dbuser = "root";
var dbpassword = "betroom123";
var urlmongo = "mongodb://" + dbuser + ":" + dbpassword + "@ds013569.mlab.com:13569/betroom";

// Connexion entre l'API et la BDD
mongoose.connect(urlmongo, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function() {
    console.log('Connexion à la BDD OK.');
})

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/api/auth', routesAuth);

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
})