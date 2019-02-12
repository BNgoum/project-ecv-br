const axios = require('axios');
const apiHeaders = { 'X-Auth-Token': '74a86b94a67541189f94e8266901f6e4' }

export const requestMatchs = id => {
    return axios.get('https://betroom-api.herokuapp.com/api/match/matchsChampionnat/' + id)
    .then((responseJson) => {
        //console.log('ResponseJson : ', responseJson.data.data.matchs)
        let type = "";
        switch (id) {
            case 'Ligue 1':
                type = "IS_L1";
                break;
            case 'Serie A':
                type = "IS_SA";
                break;
            case 'Premier League':
                type = "IS_PL";
                break;
            case 'Bundesliga':
                type = "IS_BU";
                break;
            case 'Ligue des champions':
                type = "IS_LDC";
                break;
            case 'Primera Division':
                type = "IS_LL";
                break;
            
            default:
                return state
        }

        const action = {
            type: type, value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine (get) : ', err);
    });
}

export const getAllMatchs = () => {
    return axios.get('https://betroom-api.herokuapp.com/api/match/matchs')
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération de tous les matchs de la semaine (getAllMatchs) : ', err);
    });
}

export const requestFetchMatchs = (today, nextWeek) => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchs', {
        dateFrom: today,
        dateTo: nextWeek
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine (Axios : action.js) : ', err);
    });
}

export const requestGetMatch = (id) => {
    return axios.get('https://betroom-api.herokuapp.com/api/match/match/' + id)
    .then(data => {
        return data.data.data
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération d\'un match (Axios : action.js) : ', err);
    });
}

export const requestGetMatchsBetweenIntervalAndCompetitions = (competitions, dateFrom, dateTo) => {
    return axios.get('https://api.football-data.org/v2/matches?competitions=' + competitions + '&dateFrom=' + dateFrom
    + '&dateTo=' + dateTo ,
    { headers: apiHeaders })
    .then(data => {
        return data.data.matches
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs entre un interval et des competitions (Axios : action.js) : ', err);
    });
}