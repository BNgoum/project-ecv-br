const axios = require('axios');
const domain = '192.168.1.81';
// const domain = '10.10.2.9';
// const domain = '192.168.0.25';
// const domain = '10.1.240.158';

export const requestLigue1Matchs = () => {
    return axios.post('http://' + domain + ':3000/api/match/matchsChampionnat', {
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
    return axios.post('http://' + domain + ':3000/api/match/matchsChampionnat', {
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
    return axios.post('http://' + domain + ':3000/api/match/matchsChampionnat', {
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
    return axios.post('http://' + domain + ':3000/api/match/matchsChampionnat', {
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
    return axios.post('http://' + domain + ':3000/api/match/matchsChampionnat', {
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
    return axios.post('http://' + domain + ':3000/api/match/matchsChampionnat', {
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
    return axios.post('http://' + domain + ':3000/api/match/matchs', {
        dateFrom: today,
        dateTo: nextWeek
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine (Axios : action.js) : ', err);
    });
}