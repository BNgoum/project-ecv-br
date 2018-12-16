import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';
const jwtDecode = require('jwt-decode');

import { requestUserInformation, requestUserInformationById } from '../../Store/Reducers/User/action';
import Friend from './Friend';

class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            idsPending: [],
            pending: []
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
                idsPending: data.friends[0].pending
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
                pending: [...prevState.pending, data.pseudo]
            }))
        })
        .catch((error) => console.log('Erreur lors de la récupération des pseudos : ', error))
    }

    displayPending = () => {
        return new Promise((resolve, reject) => {
            resolve(this.getIds())
        })
        .then(() => {
            const { idsPending } = this.state;
            idsPending.forEach( (id) => {
                this.getPseudo(id);
            })
        })
        .catch((error) => console.log('Erreur lors de l\'affichage des amis : ', error))
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >En attente : </Text>

                { this.state.pending.length > 0 ? <FlatList
                    data={ this.state.pending }
                    keyExtractor={ (item) => item.toString() }
                    renderItem={ ({item}) => <Friend data={item} /> }
                    />
                    :
                    <Text>Aucun amis en attente</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 22
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

export default connect(mapStateToProps, mapDispatchToProps)(Pending)