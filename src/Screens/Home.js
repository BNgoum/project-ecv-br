import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { requestUserInformation } from '../Store/Reducers/User/action';
import { getAllMatchs } from '../Store/Reducers/Match/action';
import { requestUpdateMatch } from '../Store/Reducers/BetRoom/action';

import BetRoom from '../Components/BetRoom/BetRoom';
import Tabs from '../Components/Tabs';

import TextBold from '../Components/Style/TextBold';
import ButtonPrimary from '../Components/Style/ButtonPrimary';
import ButtonPrimaryText from '../Components/Style/ButtonPrimaryText';

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
        this.getBetRoom();
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
            this.state.betRoomParticipant.map(betroom => {
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
                // this.setState({
                //     betRoomFinished: [...this.state.betRoomFinished, betroom]
                // })
                const action = { type: "ADD_BET_ROOM_FINISHED", value: betroom };
                this.props.dispatch(action);
            } else if (status.includes("IN_PLAY") || status.includes("PAUSED") || status.includes("FINISHED")) { 
                // this.setState({
                //     betRoomPending: [...this.state.betRoomPending, betroom]
                // })
                const action = { type: "ADD_BET_ROOM_PENDING", value: betroom };
                this.props.dispatch(action);
            }
            else { 
                // this.setState({
                //     betRoomOnGoing: [...this.state.betRoomOnGoing, betroom]
                // })
                const action = { type: "ADD_BET_ROOM_ON_GOING", value: betroom };
                this.props.dispatch(action);
            }
        })

        // On dispatch les BR participant
        betRoomParticipant.map(betroom => {
            let status = [];
            // on parcours tous les matchs de la BR et on ajoute son statut dans le array status
            betroom.matchs.map(match => {
                status.push(match.statut)
            })

            // On test les cas où tous les status sont à "finished", "scheduled" ou "in play" et on les ajoute dans le state correspondant
            if (status.every( val => val === "FINISHED" ) ) {
                // this.setState({
                //     betRoomFinished: [...this.state.betRoomFinished, betroom]                    
                // })

                const action = { type: "ADD_BET_ROOM_FINISHED", value: betroom };
                this.props.dispatch(action);

            } else if (status.includes("IN_PLAY") || status.includes("PAUSED") || status.includes("FINISHED")) { 
                // this.setState({
                //     betRoomPending: [...this.state.betRoomPending, betroom]
                // })

                const action = { type: "ADD_BET_ROOM_PENDING", value: betroom };
                this.props.dispatch(action);
            }
            else { 
                // this.setState({
                //     betRoomOnGoing: [...this.state.betRoomOnGoing, betroom]
                // })

                const action = { type: "ADD_BET_ROOM_ON_GOING", value: betroom };
                this.props.dispatch(action);
            }
        })
    }

    displayContent = () => {
        if (this.state.isPending) {
            if (this.props.state.AuthenticationReducer.betRoomPending.length > 0) {
                return <ScrollView contentContainerStyle={ styles.wrapperBetRoom }>
                {
                    this.props.state.AuthenticationReducer.betRoomPending.map((item, index) => (
                        <BetRoom key = {item._id.toString()} data={item} navigation={this.props.navigation} />
                    ))
                }
                </ScrollView>
            } else {
                return <View style={ styles.wrapperText }>
                    <TextBold style={ styles.textInfo }>Aucune Bet Room en attente.</TextBold>
                    <ButtonPrimary style={ styles.buttonStyle } onPress={() => this.props.navigation.navigate("NewBR")}><ButtonPrimaryText>Crée ta Bet Room</ButtonPrimaryText></ButtonPrimary>
                </View>
            }
            
        } else if (this.state.isFinished) {
            if (this.props.state.AuthenticationReducer.betRoomFinished.length > 0) {
                return <ScrollView contentContainerStyle={ styles.wrapperBetRoom }>
                {
                    this.props.state.AuthenticationReducer.betRoomFinished.map((item, index) => (
                        <BetRoom key = {item._id.toString()} data={item} navigation={this.props.navigation} />
                    ))
                }
                </ScrollView>
            } else {
                return <View style={ styles.wrapperText }>
                    <TextBold style={ styles.textInfo }>Aucune Bet Room terminée.</TextBold>
                    <ButtonPrimary style={ styles.buttonStyle } onPress={() => this.props.navigation.navigate("NewBR")}><ButtonPrimaryText>Crée ta Bet Room</ButtonPrimaryText></ButtonPrimary>
                </View>
            }
        } else {

            if (this.props.state.AuthenticationReducer.betRoomOnGoing.length > 0) {
                return <ScrollView contentContainerStyle={ styles.wrapperBetRoom }>
                {
                    this.props.state.AuthenticationReducer.betRoomOnGoing.map((item, index) => (
                        <BetRoom key = {item._id.toString()} data={item} navigation={this.props.navigation} />
                    ))
                }
                </ScrollView>
            } else {
                return <View style={ styles.wrapperText }>
                    <TextBold style={ styles.textInfo }>Aucune Bet Room à venir.</TextBold>
                    <ButtonPrimary style={ styles.buttonStyle } onPress={() => this.props.navigation.navigate("NewBR")}><ButtonPrimaryText>Crée ta Bet Room</ButtonPrimaryText></ButtonPrimary>
                </View>
            }
        }
    }

    handleDisplayTabContent = side => {
        if ( side === "first" ) { this.setState({ isPending: true, isFinished: false, isOnGoing: false }) }
        else if (side === "second") { this.setState({ isPending: false, isFinished: false, isOnGoing: true }) }
        else { this.setState({ isPending: false, isFinished: true, isOnGoing: false }) }
    }

    render() {
        // console.log('Redux BR : ', this.props.state.AuthenticationReducer.betRoomOwner)
        return (
            <View style={styles.wrapperContent}>
                <LinearGradient style={{ padding: 20, flex: 1 }} colors={['#10122d', '#385284', '#10122d']} >
                    <TextBold style={ styles.titleScreen} >Mes Bet Rooms</TextBold>

                    <Tabs firstTab="En cours" secondTab="À venir" thirdTab="Terminée" displayTabContent={this.handleDisplayTabContent}/>

                    { this.displayContent() }

                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        flex: 1
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
        flex: 1,
        marginTop: 20
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    wrapperText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfo: {
        fontSize: 22
    },
    buttonStyle: {
        alignSelf: 'center',
        width: 150,
        marginTop: 32
    }
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