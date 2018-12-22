const axios = require('axios');
const domain = '192.168.1.81';
// const domain = '10.10.2.9';
// const domain = '192.168.0.25';
// const domain = '10.1.240.158';

export const acceptedRequest = (idUserA, idUserB) => {
    return axios.post('http://' + domain + ':3000/api/friends/accepted', {
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
    return axios.post('http://' + domain + ':3000/api/friends/request', {
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