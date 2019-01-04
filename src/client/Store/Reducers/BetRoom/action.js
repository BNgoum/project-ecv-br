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

export const requestGetBetRoom = (idBetRoom) => {
    return axios.post('https://betroom-api.herokuapp.com/api/betroom/getBetRoom', {
        idBetRoom
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de la récupération des infos d\'une Bet Room : ', err);
    });
}

export const requestGetAllIdsBetRoomOwner = (_id) => {
    return axios.post('https://betroom-api.herokuapp.com/api/betroom/getAllBetRoomOwner', {
        _id
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de la récupération des infos des Bet Room owner : ', err);
    });
}

export const requestGetAllIdsBetRoomParticipant = (_id) => {
    return axios.post('https://betroom-api.herokuapp.com/api/betroom/getAllBetRoomParticipant', {
        _id
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de la récupération des infos des Bet Room participant : ', err);
    });
}

export const requestAddOwner = (idOwner, idBetRoom) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/addOwner', {
        idOwner,
        idBetRoom
    })
    .catch(err => {
        console.log('Erreur lors de la tentative d\'ajout de propriétaire de bet room : ', err);
    });
}

export const requestAddParticipant = (idParticipant, idBetRoom) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/addParticipant', {
        idParticipant,
        idBetRoom
    })
    .catch(err => {
        console.log('Erreur lors de la tentative d\'ajout de participant à une bet room : ', err);
    });
}