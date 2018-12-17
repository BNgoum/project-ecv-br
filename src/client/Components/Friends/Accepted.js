import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

const jwtDecode = require('jwt-decode');

import { requestUserInformation, requestUserInformationById } from '../../Store/Reducers/User/action';

import Friend from './Friend';

class Accepted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            idsAccepted: [],
            friends: []
        }
    }

    componentDidMount() {
        this.displayFriends();
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
                idsAccepted: data.friends[0].accepted
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
                friends: [...prevState.friends, data.pseudo]
            }))
        })
        .catch((error) => console.log('Erreur lors de la récupération des pseudos : ', error))
    }

    displayFriends = () => {
        return new Promise((resolve, reject) => {
            resolve(this.getIds())
        })
        .then(() => {
            const { idsAccepted } = this.state;
            idsAccepted.map( (id) => {
                return this.getPseudo(id);
            })
        })
        .catch((error) => console.log('Erreur lors de l\'affichage des amis : ', error))
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Acceptés : </Text>

                { this.state.friends.length > 0 ? <FlatList
                    data={ this.state.friends }
                    keyExtractor={ (item) => item.toString() }
                    renderItem={ ({item}) => <Friend data={item} /> }
                    />
                    :
                    <Text>Aucun amis</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Accepted)