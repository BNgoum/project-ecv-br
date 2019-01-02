const axios = require('axios');

export const requestCreateBetRoom = (name, owner, participants, reward, matchs, betsNumber) => {
    return axios.post('https://betroom-api.herokuapp.com/api/betroom/create', {
        name,
        owner,
        participants,
        reward,
        matchs,
        betsNumber,
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de création de Bet Room : ', err);
    });
}