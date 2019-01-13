const axios = require('axios');

export const requestLigue1Matchs = () => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchsChampionnat', {
        championnat: "Ligue 1"
    })
    .then((responseJson) => {
        const action = {
            type: "IS_L1", value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Ligue 1 (post) : ', err);
    });
}

export const requestPremierLeagueMatchs = () => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchsChampionnat', {
        championnat: 'Premier League'
    })
    .then((responseJson) => {
        const action = {
            type: "IS_PL", value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Premier League (get) : ', err);
    });
}

export const requestLaLigaMatchs = () => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchsChampionnat', {
        championnat: 'La Liga'
    })
    .then((responseJson) => {
        const action = {
            type: "IS_LL", value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine La Liga (get) : ', err);
    });
}

export const requestSerieAMatchs = () => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchsChampionnat', {
        championnat: 'Serie A'
    })
    .then((responseJson) => {
        const action = {
            type: "IS_SA", value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Serie A (get) : ', err);
    });
}

export const requestBundesligaMatchs = () => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchsChampionnat', {
        championnat: 'Bundesliga'
    })
    .then((responseJson) => {
        const action = {
            type: "IS_BU", value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Bundesliga (get) : ', err);
    });
}

export const requestLigueDesChampionsMatchs = () => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/matchsChampionnat', {
        championnat: "Ligue des Champions"
    })
    .then((responseJson) => {
        const action = {
            type: "IS_LDC", value: responseJson.data.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Ligue des Champions (get) : ', err);
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

export const requestGetMatch = (_id) => {
    return axios.post('https://betroom-api.herokuapp.com/api/match/match', {
        _id
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération d\'un match (Axios : action.js) : ', err);
    });
}