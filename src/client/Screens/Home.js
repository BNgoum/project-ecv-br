import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import jwt_decode from 'jwt-decode';
import { requestUserInformation, requestSetLastCallApi } from '../Store/Reducers/User/action';
import { getAllMatchs, requestGetMatchsBetweenIntervalAndCompetitions } from '../Store/Reducers/Match/action';
import { requestUpdateMatch } from '../Store/Reducers/BetRoom/action';

import BetRoom from '../Components/BetRoom/BetRoom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            betRoomOwner: [],
            betRoomParticipant: [],
            firstDate: "",
            lastDate: "",
            leagues: []
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
        .catch((error) => console.log('Erreur lors de la récupération des Bet Room (Home.js) : ', error))
    }

    render() {
        const betRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
        const betRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;
        return (
            <View style={styles.wrapperContent}>
                <Text style={styles.title}>Bet Room en cours</Text>
      
                 {
                    betRoomOwner.length > 0 && 
                    <View>
                        <Text style={styles.title}>Bet Room Admin :</Text>
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
                        <Text style={styles.title}>Bet Room Participant :</Text>
                        <ScrollView style={ styles.wrapperBetRoom }>
                            <FlatList
                                data={ betRoomParticipant }
                                keyExtractor={ (item) => item._id.toString() }
                                renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="participant" /> }
                            />
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        flex: 1
    },
    title: {
        margin: 16,
        fontSize: 18
    },
    wrapperBetRoom: {
        maxHeight: 270
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