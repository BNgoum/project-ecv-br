const axios = require('axios');

export const requestCreateBetRoom = (_id) => {
    return axios.post('https://betroom-api.herokuapp.com/api/friends/getAllFriends', {
        _id
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de récupération des amis: ', err);
    });
}
