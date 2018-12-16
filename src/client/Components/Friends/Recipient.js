import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';
const jwtDecode = require('jwt-decode');

import { requestUserInformation, requestUserInformationById } from '../../Store/Reducers/User/action';
import FriendRecipient from './FriendRecipient';

class Recipient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            idsRecipient: [],
            recipient: []
        }
    }

    componentDidMount() {
        this.displayPending();
    }

    getIds = () => {
        const token = this.props.state.AuthenticationReducer.isLogin;
        const decoded = jwtDecode(token);

        return new Promise((resolve, reject) => {
            resolve(requestUserInformation(decoded.email))
        })
        .then( data => {
            this.setState({
                idUser: data._id,
                idsRecipient: data.friends[0].recipient
            })
        })
        .catch((error) => console.log('Erreur lors de la récupération des informations du user (profil.js) : ', error))
    }

    getPseudo = (id) => {
        return new Promise((resolve, reject) => {
            resolve(requestUserInformationById(id))
        })
        .then(data => {
            this.setState( prevState => ({
                recipient: [...prevState.recipient, data.pseudo]
            }))
        })
        .catch((error) => console.log('Erreur lors de la récupération des pseudos : ', error))
    }

    displayPending = () => {
        return new Promise((resolve, reject) => {
            resolve(this.getIds())
        })
        .then(() => {
            const { idsRecipient } = this.state;
            idsRecipient.forEach( (id) => {
                this.getPseudo(id);
            })
        })
        .catch((error) => console.log('Erreur lors de l\'affichage des amis : ', error))
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Demande reçues : </Text>

                { this.state.recipient.length > 0 ? 
                    <FlatList
                        data={ this.state.recipient }
                        keyExtractor={ (item) => item.toString() }
                        renderItem={ ({item}) => <FriendRecipient style={styles.friendRecipient} data={item} />}
                        style={styles.friendRecipient}
                    />
                    :
                    <Text>Aucune demande d'amis</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 22
    },
    friendRecipient: {
        display: 'flex',
        flexDirection: 'row',
    }
})

const mapStateToProps = (state) => { 
    return {state: state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipient)