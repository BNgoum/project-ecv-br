import axios from 'axios';

//const domain = '10.10.2.9';
// const domain = '10.1.240.158';
const domain = '192.168.1.81';
// const domain = '192.168.0.25';

export const requestRegister = (pseudo, firstName, lastName, email, password) => {
    return axios.post('http://' + domain + ':3000/api/auth/register', {
        pseudo,
        first_name: firstName,
        last_name: lastName,
        email,
        password
    })
    .then((responseJson) => {
        if (responseJson.data.message === "User already exist" && responseJson.data.data === null) {
            const action = {
                type: "AUTH_MESSAGE_ERROR", value: "Un compte associé à cette adresse mail existe déjà."
            }
            return action;
        } else if (responseJson.data.error === "Le pseudo est déjà utilisé" && responseJson.data.data === null) {
            const action = {
                type: "AUTH_MESSAGE_ERROR", value: "Ce pseudo est déjà utilisé."
            }
            return action;
        }
        else {
            const action = {
                type: "AUTH_INSCRIPTION_NOT_VALIDATED", value: "Votre inscription est prise en compte. Vous allez recevoir un mail afin de valider votre inscription."
            }
            return action;
        }
    })
    .catch(err => {
        console.log('Erreur lors de l\'inscription du user : ', err);
    });
}

export const requestLogin = (email, password) => {
    return axios.post('http://' + domain + ':3000/api/auth/login', {
        email: email,
        password: password
    })
    .then((responseJson) => {
        if ( responseJson.data.data === null && responseJson.data.error !== "" ) {
            if ( responseJson.data.error === "User not found" ) {
                const action = {
                    type: "AUTH_MESSAGE_ERROR", value: "Les identifiants entrés n'existent pas."
                }
                return action;
            } else {
                const action = {
                    type: "AUTH_MESSAGE_ERROR", value: "Vous n'avez pas validé votre inscription."
                }
                return action;
            }
        } else {
            const action = {
                type: "IS_LOGIN", value: responseJson.data.data.token
            }
            return action;
        }
    })
    .catch(err => {
        console.log('Erreur lors de la connexion du user : ', err);
    });
}

export const requestUserInformation = (email) => {
    return axios.post('http://' + domain + ':3000/api/auth/user', {
        email: email
    })
    .then((responseJson) => {
        return responseJson.data.data.user
    })
    .catch(err => {
        console.log('Erreur lors de la récupération des informations du user : ', err);
    });
}

export const requestUserInformationById = (id) => {
    return axios.post('http://' + domain + ':3000/api/auth/userId', {
        id: id
    })
    .then((responseJson) => {
        return responseJson.data.data.user
    })
    .catch(err => {
        console.log('Erreur lors de la récupération des informations du user : ', err);
    });
}

export const requestUserInformationByPseudo = (pseudo) => {
    return axios.post('http://' + domain + ':3000/api/auth/userPseudo', {
        pseudo
    })
    .then((responseJson) => {
        if (responseJson.data.data === null && responseJson.data.error === "User not found") {
            const action = {
                type: "FOUND_USER_BY_PSEUDO", value: "Le pseudo saisie n'existe pas."
            }
            return action;
        } else {
            return responseJson.data.data.user
        }
    })
    .catch(err => {
        console.log('Erreur lors de la récupération des informations du user (by pseudo): ', err);
    });
}