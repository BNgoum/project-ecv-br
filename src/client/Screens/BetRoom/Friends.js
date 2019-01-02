import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

const jwtDecode = require('jwt-decode');
import { requestUserInformation, requestUserInformationById } from '../../Store/Reducers/User/action';

import FriendsComponent from '../../Components/BetRoom/Friends'

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    
    componentDidMount() {
        this.dispatchFriends();
    }

    // On récupère les information du user et set le state avec l'objet contenant ses amis
    getUserInformation = () => {
        const token = this.props.state.AuthenticationReducer.isLogin;
        const decoded = jwtDecode(token);

        return new Promise((resolve, reject) => {
            resolve(requestUserInformation(decoded.email))})
            .then( data => {
                this.setState({
                    user: data,
                    friendsUser: data.friends
                })
            })
            .catch((error) => console.log('Erreur lors de la récupération des informations du user (getUserInformation => Friends.js): ', error))
    }

    // On dispatch les ids des amis dans le state de redux
    dispatchFriends = () => {
        // On récupère le tableau de la fonction getUserInformation
        return new Promise((resolve, reject) => {
            resolve(this.getUserInformation());
        })
        .then( () => {

            for (let i in this.state.friendsUser) {
                if (i === "accepted") {
                    let acceptedFriends = [];

                    const friends = this.state.friendsUser.accepted.map(friend => {
                        // On récupère les info de l'ami puis on les ajoute au tableau acceptedFriends
                        return new Promise((resolve, reject) => { resolve(requestUserInformationById(friend)) })
                        .then( friend => { acceptedFriends.push(friend) })
                        .catch((error) => console.log('Erreur lors de la promise requestUserInformationById dans dispatchFriends => Friends.js : ', error))
                    })

                    // Une fois que la récupération de tous les amis acceptés, on dispatch le tableau au reducer
                    Promise.all(friends)
                    .then(() => {
                        const action = { type: "FRIENDS_ACCEPTED", value: acceptedFriends }
                        this.props.dispatch(action);
                    })
                } else if ( i === "pending" ) {
                    let pendingFriends = [];

                    const friends = this.state.friendsUser.pending.map(friend => {
                        return new Promise((resolve, reject) => { resolve(requestUserInformationById(friend)) })
                        .then( friend => { pendingFriends.push(friend) })
                        .catch((error) => console.log('Erreur lors de la promise requestUserInformationById (pending) dans dispatchFriends => Friends.js : ', error))
                    })

                    Promise.all(friends)
                    .then(() => {
                        const action = { type: "FRIENDS_PENDING", value: pendingFriends }
                        this.props.dispatch(action);
                    })
                } else {
                    let recipientFriends = [];

                    const friends = this.state.friendsUser.recipient.map(friend => {
                    
                        return new Promise((resolve, reject) => { resolve(requestUserInformationById(friend)) })
                        .then( friend => { recipientFriends.push(friend) })
                        .catch((error) => console.log('Erreur lors de la promise requestUserInformationById (recipient) dans dispatchFriends => Friends.js : ', error))
                    })

                    Promise.all(friends)
                    .then(() => {
                        const action = { type: "FRIENDS_RECIPIENT", value: recipientFriends }
                        this.props.dispatch(action);
                    })
                }
            }
        })
        .catch((error) => console.log('Erreur dans la fonction dispatchFriends : ', error))
    }
    
    render() {
        return (
            <View style={styles.wrapperFriends}>
                <FriendsComponent navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperButton: {
        alignSelf: 'center',
        backgroundColor: '#f7f7f7',
        padding: 16
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)