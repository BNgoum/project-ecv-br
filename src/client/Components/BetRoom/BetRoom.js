import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { requestPointsBR } from '../../Store/Reducers/BetRoom/action';

class BetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statut: "Pas débuté",
            arrayStatut: []
        }
    }

    componentWillMount() {
        return new Promise((resolve, reject) => {
            resolve(this.checkStatut())
        })
        .then(() => {
            if (this.state.statut === "Terminée") {
                let points = 0;

                this.props.data.matchs.map(match => {
                    points += match.points
                })

                const idUser = this.props.state.AuthenticationReducer.userInfo._id;
                const typeParticipant = this.props.typeParticipant;
                const idBetRoom = this.props.data._id;

                return new Promise((resolve, reject) => {
                    resolve(requestPointsBR(idUser, typeParticipant, idBetRoom, points))
                })
                // console.log('Total : ', points)
            }

        })
    }

    checkStatut = () => {
        // On récupère tous les status des matchs de cette Bet Room et on les stock dans le state
        const matchs = this.props.data.matchs;
        let promiseMatchs = matchs.map( match => {
            this.setState(prevState => ({
                arrayStatut: [...prevState.arrayStatut, match.statut]
            }))
        })

        // On vérifie le contenu du state et on modifie le statut en fonction de cela
        Promise.all(promiseMatchs).then(() => {
            if (this.state.arrayStatut.every( val => val === "FINISHED" ) )
                { this.setState({statut: "Terminée"}) }
            else if (this.state.arrayStatut.includes("IN_PLAY") || this.state.arrayStatut.includes("PAUSED") || this.state.arrayStatut.includes("FINISHED")) { this.setState({statut: "En cours"} )}
            else { this.setState({statut: "Pas débuté"}) }
        });
    }

    handleOnPress = () => {
        return new Promise((resolve, reject) => {
            const action = { type: "SET_CURRENT_BET_ROOM", value: this.props.data }
            //console.log('In BetRoom.js before dispatch current BR : ', this.props.data)
            resolve(this.props.dispatch(action));
        })
        .then( () => {
            const action = { type: "SET_TYPE_PARTICIPANT", value: this.props.typeParticipant }
            this.props.dispatch(action);

            this.props.navigation.navigate('BetRoomDetails');
        })
        .catch((error) => console.log('Erreur lors du handleOnPress (BetRoom.js) : ', error))
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.handleOnPress } 
                style={[styles.wrapperContent, 
                    this.state.statut === "Terminée" && styles.isFinished,
                    this.state.statut === "En cours" && styles.isInLive]}>
                <Text style={styles.title}>{ this.props.data.name }</Text>
                {
                    this.props.data.betsNumber > 1 ? 
                    <Text>{ this.props.data.betsNumber } paris</Text> :
                    <Text>{ this.props.data.betsNumber } pari</Text>
                }
                <Text>{ this.props.data.participants.length + 1 } participants</Text>
                <Text>Récompense : { this.props.data.reward }</Text>
                <Text>Statut: { this.state.statut }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#ccc',
        padding: 16,
        margin: 8
    },
    title: {
        fontSize: 18
    },
    isFinished: {
        backgroundColor: '#F00'
    },
    isInLive: {
        backgroundColor: '#0F0'
    }
})

const mapStateToProps = (state) => { return {state} }

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetRoom)