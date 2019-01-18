import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import jwt_decode from 'jwt-decode';
import { requestUserInformation, requestSetLastCallApi } from '../Store/Reducers/User/action';
import { requestGetMatch } from '../Store/Reducers/Match/action';
import { requestUpdateMatch } from '../Store/Reducers/BetRoom/action';

import BetRoom from '../Components/BetRoom/BetRoom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: "",
            betRoomOwner: [],
            betRoomParticipant: [],
        }
    }

    componentWillMount() {
        // Checker l'heure du dernier appel si > 1min, on appelle la fonction getBetRoomWithAPIFootball
        // Si < 1min, on appelle la fonction getBetRoom sans l'appel API Football
        // console.log('Date : ', requestGetLastCallApi()

        // const lastcall = moment(this.props.state.AuthenticationReducer.userInfo.lastCallApi).format();
        // const now = moment().tz("Europe/Paris");
        // console.log('Props : ', lastcall)
        // console.log('Now : ', moment().tz("Europe/Paris").format())
        // console.log('Diff : ', now.diff(lastcall, 'minutes'))
        
        // if ( now.diff(lastcall, 'minutes') > 1 ) {
        //     this.getBetRoomWithAPIFootball();
        // } else {

        // }
        console.log('in ComponentWillMount')
        this.getBetRoomWithAPIFootball();
        
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

    getBetRoomWithAPIFootball = () => {
        // On récupère les Bet Room Owner et participant du user et on les ajoute dans le state
        return new Promise((resolve, reject) => {
            resolve(this.getInformationsUser());
        })
        .then(() => {
            const idUser = this.props.state.AuthenticationReducer.userInfo._id;
            const now = moment().tz("Europe/Paris").format();

            return requestSetLastCallApi(idUser, now)
        })
        .then(() => {
            // On parcours chaque BR owner
            this.state.betRoomOwner.map(betRoom => {
                // On parcours chaque match de la BR
                betRoom.matchs.map(match => {
                    return new Promise((resolve, reject) => {
                        // On récupère les informations du match sur l'API football
                        resolve(requestGetMatch(match._id))
                    })
                    .then( data => {
                        // On met à jour les info du match de la BDD avec les nouvelles info

                        const userId = this.props.state.AuthenticationReducer.userInfo._id;
                        const typeParticipant = "owner";
                        const betRoomId = betRoom._id;
                        const idMatch = data.id;
                        const scoreHomeTeam = data.score.fullTime.homeTeam;
                        const scoreAwayTeam = data.score.fullTime.awayTeam;
                        const status = data.status;

                        return requestUpdateMatch(userId, typeParticipant, betRoomId, idMatch, scoreHomeTeam, scoreAwayTeam, status);
                    })
                    .then(() => { this.getInformationsUser() }) // On récupère les BR à jour
                    .then(() => {
                        // On ajoute chaque BR au state Redux
                        this.state.betRoomOwner.map(betRoom => {
                            let currentBetRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
                            currentBetRoomOwner.push(betRoom);
            
                            const action = { type: "ADD_OWNER_BET_ROOM", value: currentBetRoomOwner }
                            this.props.dispatch(action);
                        })
                    })
                    .catch((error) => console.log('Erreur lors de la récupération des infos d\'un match (owner Home.js) : ', error))
                })
            });
        })
        .then(() => {
            // On parcours chaque BR participants
            this.state.betRoomParticipant.map(betRoom => {
                // On parcours chaque match de la BR
                betRoom.matchs.map(match => {
                    return new Promise((resolve, reject) => {
                        // On récupère les informations du match sur l'API football
                        resolve(requestGetMatch(match._id))
                    })
                    .then( data => {
                        // On met à jour les info du match de la BDD avec les nouvelles info
                        const userId = this.props.state.AuthenticationReducer.userInfo._id
                        const typeParticipant = "participant";
                        const betRoomId = betRoom._id;
                        const matchId = data._id;
                        const scoreHomeTeam = data.score.fullTime.homeTeam || 0;
                        const scoreAwayTeam = data.score.fullTime.awayTeam || 0;
                        const status = data.status;
                        
                        requestUpdateMatch(userId, typeParticipant, betRoomId, matchId, scoreHomeTeam, scoreAwayTeam, status);
                    })
                    .then(() => { this.getInformationsUser() }) // On récupère les BR à jour
                    .then(() => {
                        // On ajoute chaque BR au state Redux
                        this.state.betRoomParticipant.map(betRoom => {
                            let currentBetRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;
                            currentBetRoomParticipant.push(betRoom);
            
                            const action = { type: "ADD_PARTICIPANT_BET_ROOM", value: currentBetRoomParticipant }
                            this.props.dispatch(action);
                        })
                    })
                    .catch((error) => console.log('Erreur lors de la récupération des infos d\'un match (participant Home.js) : ', error))
                })
            });
        })
        .catch((error) => console.log('Erreur lors de la récupération des bet room owner : ', error))
    }

    render() {
        const betroom = this.props.state.AuthenticationReducer;
        return (
            <View style={styles.wrapperContent}>
                <Text style={styles.title}>Bet Room en cours</Text>
                
                {
                    betroom.betRoomOwner.length > 0 ? 
                        <View>
                            <Text style={styles.title}>Bet Room Admin :</Text>
                            <ScrollView style={ styles.wrapperBetRoom }>
                                <FlatList
                                    data={ betroom.betRoomOwner }
                                    keyExtractor={ (item) => item._id.toString() }
                                    renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="owner" /> }
                                />
                            </ScrollView>
                        </View>
                        : null
                }

                {
                    betroom.betRoomParticipant.length > 0 ?
                    <View>
                        <Text style={styles.title}>Bet Room Participant :</Text>
                        <ScrollView style={ styles.wrapperBetRoom }>
                            <FlatList
                                data={ betroom.betRoomParticipant }
                                keyExtractor={ (item) => item._id.toString() }
                                renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="participant" /> }
                            />
                        </ScrollView>
                    </View> 
                    : null
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