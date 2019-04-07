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

export const requestUpdateMatch = (_id, typeParticipant, idBetRoom, idMatch, scoreHomeTeam, scoreAwayTeam, status, gagnant) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/matchUpdated', {
        _id,
        typeParticipant,
        idBetRoom,
        idMatch,
        scoreHomeTeam,
        scoreAwayTeam,
        status,
        gagnant
    })
    .catch(err => {
        console.log('Erreur lors de la mise à jour du match (BetRoom/action.js) : ', err);
    });
}

export const requestPoints = (_id, typeParticipant, idBetRoom, idMatch, points) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/pointsUpdated', {
        _id,
        typeParticipant,
        idBetRoom,
        idMatch,
        points,
    })
    .then(res => {
        console.log('Call success : ', res.data.data)
    })
    .catch(err => {
        console.log('Erreur lors de la mise à jour des points (BetRoom/action.js) : ', err);
    });
}

export const requestPointsBR = (_id, typeParticipant, idBetRoom, points) => {
    return axios.put('https://betroom-api.herokuapp.com/api/betroom/put/pointsUpdatedBR', {
        _id,
        typeParticipant,
        idBetRoom,
        points,
    })
    .catch(err => {
        console.log('Erreur lors de la mise à jour des points BR (BetRoom/action.js) : ', err);
    });
}