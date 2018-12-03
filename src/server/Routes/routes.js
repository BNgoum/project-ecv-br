var express = require('express');
var mongoose = require('mongoose');
const fetch = require('node-fetch');
const moment = require('moment');
var Championnat = require('../Models/championnats');
var db = mongoose.connection;
const app = express.Router();
var MatchsDuJour = require('../Models/match_du_jour');
var MatchsDuMois = require('../Models/match_du_mois');
var MatchsDeLaSemaine = require('../Models/match_de_la_semaine');
// var collectionOfChampionnat = db.collection('championnats');
var collectionOfMatchsDuJour = db.collection('matchsdujour');
var collectionOfMatchsDeLaSemaine = db.collection('matchsdelasemaine');
var collectionOfMatchsDuMois = db.collection('matchsdumois');
var today = moment().format('YYYY-MM-DD');
var apiHeaders = { 'X-Auth-Token': '74a86b94a67541189f94e8266901f6e4' }

// Fonction récupéré sur Stackoverflow / permet de récupérer le jour du mois prochain
moment.addRealMonth = function addRealMonth(d) {
    var fm = moment(d).add(1, 'M');
    var fmEnd = moment(fm).endOf('month');
    return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd') : fm;  
}

var nextMonth = moment.addRealMonth(moment());

const championnats = {
    "Ligue 1": 2015,
    "Premier League": 2021,
    "Bundesliga": 2002,
    "Serie A": 2019,
    "La Liga": 2014,
    "Ligue des Champions": 2001
}

// Fonction de tri récupérer sur StackOverflow 
sortByDateAsc = function (lhs, rhs) {
    return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
}

app.route('/fetchMatchDuJour')
    .post((req, res) => {
        // On supprime les tous les documents de la collection matchs du jour
        collectionOfMatchsDuJour.deleteMany({});

        // Pour chaque championnat, on fetch les matchs du jour
        for (const i in championnats) {
            if (championnats.hasOwnProperty(i)) {
                const championnat = championnats[i];

                today = "2018-11-24"
                
                fetch('https://api.football-data.org/v2/competitions/' + championnat + '/matches?dateFrom=' + today + '&dateTo=' + today, {
                    headers: apiHeaders
                }).then(response => {
                    return response.json();
                }).then(data => {
                    data.matches.forEach(function(element) {

                        var matchdujour = new MatchsDuJour({
                            championnat: i,
                            homeTeam: element.homeTeam.name,
                            awayTeam: element.awayTeam.name,
                            dateHeureMatch: element.utcDate,
                            dateMatch: moment(element.utcDate).format('DD-MM-YYYY'),
                            heureMatch: moment(element.utcDate).format('HH:mm:ss'),
                            gagnant: element.score.winner,
                            scoreHomeTeam: element.score.fullTime.homeTeam,
                            scoreAwayTeam: element.score.fullTime.awayTeam
                        })

                        collectionOfMatchsDuJour.insertOne(matchdujour);
                    })
                    
                    res.status(201).json({Resultat: "Les matchs du jour ont été ajoutés."});
                }).catch(err => {
                    console.log('Erreur lors de l\'ajout des matchs du jour : ', err);
                });
            }
        }
    })

app.route('/fetchMatchDeLaSemaine')
    .post((req, res) => {

        // On supprime les tous les documents de la collection matchs de la semaine
        collectionOfMatchsDeLaSemaine.deleteMany({});

        let today = moment();
        let nextWeek = moment(today, "YYYY-MM-DD").add(7, 'days');

        for (const i in championnats) {
            if (championnats.hasOwnProperty(i)) {
                const championnat = championnats[i];
                
                fetch('https://api.football-data.org/v2/competitions/' + championnat + '/matches?dateFrom=' + today.format("YYYY-MM-DD") + '&dateTo=' + nextWeek.format("YYYY-MM-DD"), {
                    headers: apiHeaders
                }).then(response => {
                    return response.json();
                }).then(data => {
                    data.matches.forEach(function(element) {

                        var matchdujour = new MatchsDeLaSemaine({
                            championnat: i,
                            homeTeam: element.homeTeam.name,
                            awayTeam: element.awayTeam.name,
                            dateHeureMatch: element.utcDate,
                            dateMatch: moment(element.utcDate).format('DD-MM-YYYY'),
                            heureMatch: moment(element.utcDate).format('HH:mm:ss'),
                            gagnant: element.score.winner,
                            scoreHomeTeam: element.score.fullTime.homeTeam,
                            scoreAwayTeam: element.score.fullTime.awayTeam
                        })

                        collectionOfMatchsDeLaSemaine.insertOne(matchdujour);
                    })

                    // if (err) {
                    //     return res.json({status: 500, error: err});
                    //   }
                    // res.json({ status: 500, Resultat: "Les matchs de la semaine ont été ajoutés." });
                    
                    // res.json({Resultat: "Les matchs de la semaine ont été ajoutés."});
                .then((res) => {
                    if (res) {
                        res.json({ status: 200, Resultat: "Les matchs de la semaine ont été ajoutés." });
                    }})
                }).catch(err => {
                    console.log('Erreur lors de l\'ajout des matchs de la semaine (routes) : ', err);
                });
            }
        }
    })

app.route('/fetchMatchDuMois')
    .post((req, res) => {

        // On supprime les tous les documents de la collection matchs du mois
        collectionOfMatchsDuMois.deleteMany({});

        var endOfMonth = nextMonth.format('YYYY-MM-DD');

        for (const i in championnats) {
            if (championnats.hasOwnProperty(i)) {
                const championnat = championnats[i];
                
                fetch('https://api.football-data.org/v2/competitions/' + championnat + '/matches?dateFrom=' + today + '&dateTo=' + endOfMonth, {
                    headers: apiHeaders
                }).then(response => {
                    return response.json();
                }).then(data => {
                    data.matches.forEach(function(element) {

                        var matchdujour = new MatchsDuMois({
                            championnat: i,
                            homeTeam: element.homeTeam.name,
                            awayTeam: element.awayTeam.name,
                            dateHeureMatch: element.utcDate,
                            dateMatch: moment(element.utcDate).format('DD-MM-YYYY'),
                            heureMatch: moment(element.utcDate).format('HH:mm:ss'),
                            gagnant: element.score.winner,
                            scoreHomeTeam: element.score.fullTime.homeTeam,
                            scoreAwayTeam: element.score.fullTime.awayTeam
                        })

                        collectionOfMatchsDuMois.insertOne(matchdujour);
                    })
                    
                    res.status(201).json({Resultat: "Les matchs du mois ont été ajoutés."});
                }).catch(err => {
                    console.log('Erreur lors de l\'ajout des matchs du mois : ', err);
                });
            }
        }
    })

app.route('/matchdujour')
    .get((req, res) => {
        var championnat = req.query["championnat"];
        MatchsDuJour.find({championnat : championnat}, (err, matchs) => {

            if (err) return err;

            var momentDates = [];
            var arrayMatchsSort = [];

            for (let i in matchs) {
                momentDates.push(moment(matchs[i].dateHeureMatch));
            }

            momentDates.sort(sortByDateAsc);

            for (let ite in momentDates) {
                for (let a in matchs) {
                    var concatDateHeureMatch = matchs[a].dateMatch + ' ' + matchs[a].heureMatch;
                    if (momentDates[ite].format('DD-MM-YYYY HH:mm:ss') == concatDateHeureMatch && !arrayMatchsSort.includes(matchs[a])) {
                        arrayMatchsSort.push(matchs[a]);
                    }
                }
            }

            res.send({ matchs: arrayMatchsSort });
        });
})

app.route('/matchdelasemaine')
    .get((req, res) => {
        var championnat = req.query["championnat"];
        MatchsDeLaSemaine.find({championnat : championnat}, (err, matchs) => {
            if (err) return err;

            var momentDates = [];
            var arrayMatchsSort = [];

            for (let i in matchs) {
                momentDates.push(moment(matchs[i].dateHeureMatch));
            }

            momentDates.sort(sortByDateAsc);

            for (let ite in momentDates) {
                for (let a in matchs) {
                    var concatDateHeureMatch = matchs[a].dateMatch + ' ' + matchs[a].heureMatch;
                    if (momentDates[ite].format('DD-MM-YYYY HH:mm:ss') == concatDateHeureMatch && !arrayMatchsSort.includes(matchs[a])) {
                        arrayMatchsSort.push(matchs[a]);
                    }
                }
            }

            res.send({ matchs: arrayMatchsSort });
        });
})

app.route('/matchdumois')
    .get((req, res) => {
        var championnat = req.query["championnat"];
        MatchsDuMois.find({championnat : championnat}, (err, matchs) => {
            if (err) return err;

            var momentDates = [];
            var arrayMatchsSort = [];

            for (let i in matchs) {
                momentDates.push(moment(matchs[i].dateHeureMatch));
            }

            momentDates.sort(sortByDateAsc);

            for (let ite in momentDates) {
                for (let a in matchs) {
                    var concatDateHeureMatch = matchs[a].dateMatch + ' ' + matchs[a].heureMatch;
                    if (momentDates[ite].format('DD-MM-YYYY HH:mm:ss') == concatDateHeureMatch && !arrayMatchsSort.includes(matchs[a])) {
                        arrayMatchsSort.push(matchs[a]);
                    }
                }
            }

            res.send({ matchs: arrayMatchsSort });
        });
})

