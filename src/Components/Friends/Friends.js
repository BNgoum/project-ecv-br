import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

const jwtDecode = require('jwt-decode');
import { requestUserInformation, requestUserInformationById } from '../../Store/Reducers/User/action';

import Accepted from './Accepted';
import Pending from './Pending';
import Recipient from './Recipient';
import FriendRequest from './FriendRequest';

import TextBold from '../Style/TextBold';
import TextRegular from '../Style/TextRegular';
import ButtonPrimary from '../Style/ButtonPrimary';
import Link from '../Style/Link';
import LinkText from '../Style/LinkText';
import ButtonPrimaryText from '../Style/ButtonPrimaryText';

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            friendsUser: {}
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
        const { accepted, recipient, pending } = this.props.state.FriendReducer
        return (
            <View style={ styles.wrapperContent } >
                <ButtonPrimary onPress={ () => this.props.navigation.navigate('ResearchFriends')} style={ styles.linkStyle }>
                    <ButtonPrimaryText style={styles.linkTitle} >Ajouter un ami</ButtonPrimaryText>
                </ButtonPrimary>
                {/* <FriendRequest user={this.state.user} /> */}

                <TextBold style={styles.title} >Mes amis</TextBold>

                {
                    accepted.length > 0 ? 
                    <Accepted friends={accepted} /> : 
                    <TextRegular style={ styles.empty }>Aucun amis, ajoute tes amis en appuyant sur le bouton au-dessus</TextRegular>
                }

                { recipient.length > 0 && <Recipient friends={recipient} /> }

                { pending.length > 0 && <Pending friends={pending} /> }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        padding: 20
    },
    title: {
        fontSize: 18,
        marginTop: 12,
        marginBottom: 12
    },
    subTitle: {
        fontSize: 22,
        marginBottom: 8
    },
    empty: {
        marginBottom: 16
    },
    linkStyle: {
        alignSelf: 'center',
        marginVertical: 12,
        width: 160
    },
    linkTitle: {
        color: '#fff',
        fontSize: 18,
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends)