const axios = require('axios');
const domain = '192.168.1.81';

export const requestLigue1Matchs = () => {
    return axios.get('http://' + domain + ':3000/api/matchsChampionnat', {
        params: {
            championnat: 'Ligue 1'
        }
    })
    .then((responseJson) => {
        const action = {
            type: "IS_L1", value: responseJson.data.matchs
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Ligue 1 (get) : ', err);
    });
}

export const requestPremierLeagueMatchs = () => {
    return axios.get('http://' + domain + ':3000/api/matchsChampionnat', {
        params: {
            championnat: 'Premier League'
        }
    })
    .then((responseJson) => {
        const action = {
            type: "IS_PL", value: responseJson.data.matchs
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Premier League (get) : ', err);
    });
}

export const requestLaLigaMatchs = () => {
    return axios.get('http://' + domain + ':3000/api/matchsChampionnat', {
        params: {
            championnat: 'La Liga'
        }
    })
    .then((responseJson) => {
        const action = {
            type: "IS_LL", value: responseJson.data.matchs
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine La Liga (get) : ', err);
    });
}

export const requestSerieAMatchs = () => {
    return axios.get('http://' + domain + ':3000/api/matchsChampionnat', {
        params: {
            championnat: 'Serie A'
        }
    })
    .then((responseJson) => {
        console.log('#######    #######  : ', responseJson.data)
        const action = {
            type: "IS_SA", value: responseJson.data.matchs
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Serie A (get) : ', err);
    });
}

export const requestBundesligaMatchs = () => {
    return axios.get('http://' + domain + ':3000/api/matchsChampionnat', {
        params: {
            championnat: 'Bundesliga'
        }
    })
    .then((responseJson) => {
        const action = {
            type: "IS_BU", value: responseJson.data.matchs
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Bundesliga (get) : ', err);
    });
}

export const requestLigueDesChampionsMatchs = (championnat) => {
    return axios.get('http://' + domain + ':3000/api/matchsChampionnat', {
        params: {
            championnat: championnat
        }
    })
    .then((responseJson) => {
        const action = {
            type: "IS_LDC", value: responseJson.data.matchs || []
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine Ligue des Champions (get) : ', err);
    });
}

export const requestFetchMatchs = (today, nextWeek) => {
    return axios.post('http://' + domain + ':3000/api/matchs', {
        dateFrom: today,
        dateTo: nextWeek
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des matchs de la semaine (fetch : action.js) : ', err);
    });
}