import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import jwt_decode from 'jwt-decode';
import { requestUserInformation, requestSetLastCallApi } from '../Store/Reducers/User/action';
import { getAllMatchs, requestGetMatchsBetweenIntervalAndCompetitions } from '../Store/Reducers/Match/action';
import { requestUpdateMatch } from '../Store/Reducers/BetRoom/action';

import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import BetRoom from '../Components/BetRoom/BetRoom';
import Tabs from '../Components/Tabs';

import TextBold from '../Components/Style/TextBold';

import { LinearGradient } from 'expo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            betRoomOwner: [],
            betRoomParticipant: [],
            firstDate: "",
            lastDate: "",
            leagues: [],
            isPending: true,
            isFinished: false,
            isOnGoing: false,
            betRoomPending: [],
            betRoomOnGoing: [],
            betRoomFinished: [],
        }
    }

    componentWillMount() {
        this.getBetRoom()
    }

    getInformationsUser = () => {
        const token = this.props.state.AuthenticationReducer.isLogin;
        const decoded = jwt_decode(token);

        return new Promise((resolve, reject) => {
            resolve(requestUserInformation(decoded.email))
        })
        .then(data => {
            this.setState({
                idUser: data._id,
                betRoomOwner: data.bet_room.owner,
                betRoomParticipant: data.bet_room.participant
            })
        })
        .catch((error) => console.log('Erreur lors de la récupération des informations du user (Home.js) : ', error))
    }

    getBetRoom = () => {
        return new Promise((resolve, reject) => {
            resolve(this.getInformationsUser());
        })
        .then(() => {
            // Les Bet Room du user sont défini dans le state
            // On récupère tous les matchs de la base de données qui se mettent à jour toutes les 30sec
            return getAllMatchs();
        })
        .then( allMatchs => {
            const matchsBdd = allMatchs.data.data.matchs;
            const userId = this.props.state.AuthenticationReducer.userInfo._id;
            // Pour chaque type de Bet Room, on va mapper sur les matchs pour les updates
            // On parcours les BR Owner du user
            this.state.betRoomOwner.map(betroom => {
                // Ensuite, on parcours chaque match d'une BR
                betroom.matchs.map(match => {
                    // On parcours les matchs stockés en BDD
                    matchsBdd.map(matchBdd => {
                        // Si deux id match correspondent
                        if (match._id === matchBdd._id) {
                            // On met à jour le score et le statut du match dans le user
                            const scoreHomeTeam = matchBdd.scoreHomeTeam;
                            const scoreAwayTeam = matchBdd.scoreAwayTeam;
                            const statut = matchBdd.statut;
                            const gagnant = matchBdd.gagnant;

                            return requestUpdateMatch(userId, "owner", betroom._id, match._id, scoreHomeTeam, scoreAwayTeam, statut, gagnant);
                        }
                    })
                })
            })

            // On parcours les BR Participant du user
            this.state.betRoomOwner.map(betroom => {
                // Ensuite, on parcours chaque match d'une BR
                betroom.matchs.map(match => {
                    // On parcours les matchs stockés en BDD
                    matchsBdd.map(matchBdd => {
                        // Si deux id match correspondent
                        if (match._id === matchBdd._id) {
                            // On met à jour le score et le statut du match dans le user
                            const scoreHomeTeam = matchBdd.scoreHomeTeam;
                            const scoreAwayTeam = matchBdd.scoreAwayTeam;
                            const statut = matchBdd.statut;
                            const gagnant = matchBdd.gagnant;
                            return requestUpdateMatch(userId, "participant", betroom._id, match._id, scoreHomeTeam, scoreAwayTeam, statut, gagnant);
                        }
                    })
                })
            })
        })
        .then(() => {
            this.getInformationsUser()
        })
        .then(() => {
            const actionAddOwnerBR = { type: "ADD_OWNER_BET_ROOM", value: this.state.betRoomOwner }
            this.props.dispatch(actionAddOwnerBR);
            
            const actionAddParticipantBR = { type: "ADD_PARTICIPANT_BET_ROOM", value: this.state.betRoomParticipant }
            this.props.dispatch(actionAddParticipantBR);
        })
        .then(() => {
            this.dispatchBetRoomByStatus()
        })
        .catch((error) => console.log('Erreur lors de la récupération des Bet Room (Home.js) : ', error))
    }

    dispatchBetRoomByStatus = () => {
        const betRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
        const betRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;

        // On dispatch les BR admin
        betRoomOwner.map(betroom => {
            let status = [];
            // on parcours tous les matchs de la BR et on ajoute son statut dans le array status
            betroom.matchs.map(match => {
                status.push(match.statut)
            })

            // On test les cas où tous les status sont à "finished", "scheduled" ou "in play" et on les ajoute dans le state correspondant
            if (status.every( val => val === "FINISHED" ) ) {
                this.setState({
                    betRoomFinished: [...this.state.betRoomFinished, betroom]
                })
            } else if (status.includes("IN_PLAY") || status.includes("PAUSED") || status.includes("FINISHED")) { 
                this.setState({
                    betRoomPending: [...this.state.betRoomPending, betroom]
                })
            }
            else { 
                this.setState({
                    betRoomOnGoing: [...this.state.betRoomOnGoing, betroom]
                })
            }
        })

        // console.log('Is finished : ', this.state.betRoomFinished)
        // console.log('Is on going : ', this.state.betRoomOnGoing)
        // console.log('Is pending : ', this.state.betRoomPending)
    }

    displayContent = () => {
        const betRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
        const betRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;

        let arrayBetRoomOwner = [];
        let arrayBetRoomParticipant = [];

        if (this.state.isPending) {

        } else if (this.state.isFinished) {
            betRoomOwner.map(betroom => {
                betroom.matchs.map(match => {

                })
            })
        } else {

        }
    }

    handleDisplayTabContent = side => {
        if ( side === "first" ) { this.setState({ isPending: true, isFinished: false, isOnGoing: false }) }
        else if (side === "second") { this.setState({ isPending: false, isFinished: false, isOnGoing: true }) }
        else { this.setState({ isPending: false, isFinished: true, isOnGoing: false }) }
    }

    render() {
        const betRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
        const betRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;

        return (
            <View style={styles.wrapperContent}>
                <LinearGradient style={{ padding: 20 }} colors={['#10122d', '#385284', '#10122d']} >
                    <TextBold style={ styles.titleScreen} >Mes Bet Rooms</TextBold>

                    <Tabs firstTab="En cours" secondTab="À venir" thirdTab="Terminée" displayTabContent={this.handleDisplayTabContent}/>

                    { this.displayContent() }

                    {/* <Text style={styles.title}>Bet Room en cours</Text> */}

                    {
                        betRoomOwner.length > 0 && 
                        <View style={{ marginTop: 20 }}>
                            {/* <Text style={styles.title}>Bet Room Admin :</Text> */}
                            <ScrollView style={ styles.wrapperBetRoom }>
                                <FlatList
                                    data={ betRoomOwner }
                                    keyExtractor={ (item) => item._id.toString() }
                                    renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="owner" /> }
                                />
                            </ScrollView>
                        </View>
                    }

                    {
                        betRoomParticipant.length > 0 &&
                        <View>
                            {/* <Text style={styles.title}>Bet Room Participant :</Text> */}
                            <ScrollView style={ styles.wrapperBetRoom }>
                                <FlatList
                                    data={ betRoomParticipant }
                                    keyExtractor={ (item) => item._id.toString() }
                                    renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="participant" /> }
                                />
                            </ScrollView>
                        </View>
                    }
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        flex: 1,
        // paddingHorizontal: 20
    },
    titleScreen: {
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: 20
    },
    title: {
        margin: 16,
        fontSize: 18
    },
    wrapperBetRoom: {
        marginBottom: 100
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})

const mapStateToProps = (state) => { 
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)