const axios = require('axios');

export const acceptedRequest = (idUserA, idUserB) => {
    return axios.post('https://betroom-api.herokuapp.com/api/friends/accepted', {
        idUserA,
        idUserB
    })
    .then(() => {
        const action = {
            type: "FRIENDS_ACCEPTED", value: true
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative d\'ajout d\'amis (friends/action.js) : ', err);
    });
}

export const friendRequest = (idUserA, idUserB) => {
    return axios.post('https://betroom-api.herokuapp.com/api/friends/request', {
        idUserA,
        idUserB
    })
    .then(() => {
        const action = {
            type: "FRIENDS_REQUEST", value: "La demande à bien été envoyé."
        }
        return action;
    })
    .catch(err => {
        console.log('Erreur lors de la tentative d\'ajout d\'amis (friends/action.js) : ', err);
    });
}