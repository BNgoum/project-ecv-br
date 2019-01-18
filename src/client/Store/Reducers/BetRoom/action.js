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

export const requestAddOwner = (idOwner, betRoom) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/addOwner', {
        idOwner,
        betRoom
    })
    .catch(err => {
        console.log('Erreur lors de la tentative d\'ajout de propriétaire de bet room : ', err);
    });
}

export const requestAddParticipant = (idParticipant, betRoom) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/addParticipant', {
        idParticipant,
        betRoom
    })
    .catch(err => {
        console.log('Erreur lors de la tentative d\'ajout de participant à une bet room : ', err);
    });
}

export const requestSetScore = (_id, typeParticipant, idBetRoom, idMatch, scoreHomeTeam, scoreAwayTeam) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/teamScore', {
        _id,
        typeParticipant,
        idBetRoom,
        idMatch,
        scoreHomeTeam,
        scoreAwayTeam
    })
    .catch(err => {
        console.log('Erreur lors de la tentative de modification de score : ', err);
    });
}

export const requestUpdateMatch = (_id, typeParticipant, idBetRoom, idMatch, scoreHomeTeam, scoreAwayTeam, status) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/matchUpdated', {
        _id,
        typeParticipant,
        idBetRoom,
        idMatch,
        scoreHomeTeam,
        scoreAwayTeam,
        status
    })
    .catch(err => {
        console.log('Erreur lors de la mise à jour du match : ', err);
    });
}