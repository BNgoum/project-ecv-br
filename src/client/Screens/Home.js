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
        // Checker l'heure du dernier appel si > 1min, on appelle la fonction getBetRoomWithAPIFootball
        // Si < 1min, on appelle la fonction getBetRoom sans l'appel API Football
        this.getBetRoom();
    }

    // On récupère la date la plus tôt et la plus tard des matches de toutes les BR
    getFirstAndLastDate = () => {
        let firstDate = this.state.betRoomOwner[0].matchs[0].dateHeureMatch;
        let lastDate = this.state.betRoomOwner[0].matchs[0].dateHeureMatch;

        this.state.betRoomOwner.map(betroom => {
            betroom.matchs.map(match => {
                if (moment(match.dateHeureMatch).isAfter(firstDate)) {
                    lastDate = match.dateHeureMatch;
                }

                if ((moment(match.dateHeureMatch).isBefore(firstDate))) {
                    firstDate = match.dateHeureMatch;
                }
            })
        })

        this.setState({ firstDate, lastDate});
    }

    // On récupère tous les championnats des Bet Room
    getLeagues = () => {
        let listLeagues = [];
        let listLeaguesByNumber = [];
        const championnats = {
            "Ligue 1": 2015,
            "Premier League": 2021,
            "Bundesliga": 2002,
            "Serie A": 2019,
            "La Liga": 2014,
            "Ligue des Champions": 2001
        }

        // On parcours toutes les BR owner et on ajoute les championnats dans un array
        this.state.betRoomOwner.map(betroom => {
            betroom.matchs.map(match => {
                if ( !listLeagues.includes(match.championnat) ) {
                    listLeagues.push(match.championnat)
                }
            })
        })

        // On parcours toutes les BR participant et on ajoute les championnats dans un array
        this.state.betRoomParticipant.map(betroom => {
            betroom.matchs.map(match => {
                if ( !listLeagues.includes(match.championnat) ) {
                    listLeagues.push(match.championnat)
                }
            })
        })

        // On parcours la liste des championnats et on ajoute leur correspondance en nombre (ligue 1 = 2015)
        listLeagues.map(league => {
            for (const key in championnats) {
                if (championnats.hasOwnProperty(key)) {
                    const element = championnats[key];
                    if ( key == league) {
                        listLeaguesByNumber.push(element)
                    }
                }
            }
        })

        this.setState({leagues: listLeaguesByNumber})
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

    getBetRoomWithAPIFootball = () => {
        // On récupère les Bet Room Owner et participant du user et on les ajoute dans le state
        return new Promise((resolve, reject) => {
            resolve(this.getInformationsUser());
        })
        .then(() => {
            const idUser = this.props.state.AuthenticationReducer.userInfo._id;
            const now = moment().tz("Europe/Paris").format();

            this.getFirstAndLastDate();
            this.getLeagues();

            requestSetLastCallApi(idUser, now);

            return requestGetMatchsBetweenIntervalAndCompetitions(this.state.leagues, moment(this.state.firstDate).format("YYYY-MM-DD"), moment(this.state.lastDate).format("YYYY-MM-DD"))
        })
        .then(matches => {
            // Matches contient tous les matchs de l'intervalle définit dans le requête au dessus
            // On le parcours et on compare chaque id match avec les id match du state

            const userId = this.props.state.AuthenticationReducer.userInfo._id;
            
            this.state.betRoomOwner.map(betRoom => {
                betRoom.matchs.map(match => {
                    matches.map(reqMatch => {
                        if ( reqMatch.id == match._id ) {
                            const scoreHomeTeam = reqMatch.score.fullTime.homeTeam;
                            const scoreAwayTeam = reqMatch.score.fullTime.awayTeam;
                            //console.log('Match pour : ', reqMatch)

                            return requestUpdateMatch(userId, "owner", betRoom._id, match._id, scoreHomeTeam, scoreAwayTeam, reqMatch.status, reqMatch.score.winner);
                        }
                    })
                })
            })
            
            this.state.betRoomParticipant.map(betRoom => {
                betRoom.matchs.map(match => {
                    matches.map(reqMatch => {
                        if ( reqMatch.id == match._id ) {
                            const scoreHomeTeam = reqMatch.score.fullTime.homeTeam;
                            const scoreAwayTeam = reqMatch.score.fullTime.awayTeam;
    
                            return requestUpdateMatch(userId, "participant", betRoom._id, match._id, scoreHomeTeam, scoreAwayTeam, reqMatch.status, reqMatch.score.winner);
                        }
                    })
                })
            })
        })
        .then(() => {
            this.getInformationsUser();
        })
        .then(() => {
            console.log('In home js function')
            //console.log('After request state : ', this.state.betRoomOwner)
            // On ajoute chaque BR owner au state Redux
            this.state.betRoomOwner.map(betRoom => {
                let currentBetRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
                currentBetRoomOwner.push(betRoom);

                const action = { type: "ADD_OWNER_BET_ROOM", value: currentBetRoomOwner }
                this.props.dispatch(action);
            })

            // On ajoute chaque BR participant au state Redux
            this.state.betRoomParticipant.map(betRoom => {
                let currentBetRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;
                currentBetRoomParticipant.push(betRoom);

                const action = { type: "ADD_PARTICIPANT_BET_ROOM", value: currentBetRoomParticipant }
                this.props.dispatch(action);
            })
        })          
        .catch((error) => console.log('Erreur lors de la récupération des bet room sur le home page : ', error))
    }

    render() {
        const betRoomOwner = this.props.state.AuthenticationReducer.betRoomOwner;
        const betRoomParticipant = this.props.state.AuthenticationReducer.betRoomParticipant;

        console.log('Call in Home.js : ', betRoomOwner)
        console.log('Call in Home.js : ', betRoomParticipant)
        return (
            <View style={styles.wrapperContent}>
                <Text style={styles.title}>Bet Room en cours</Text>
                
                {/* <View>
                    <Text style={styles.title}>Bet Room Admin :</Text>
                    <ScrollView style={ styles.wrapperBetRoom }>
                        <FlatList
                            data={ betRoomOwner }
                            keyExtractor={ (item) => item._id.toString() }
                            renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="owner" /> }
                        />
                    </ScrollView>
                </View> */}
      
                 {
                    this.props.state.AuthenticationReducer.betRoomOwner.length > 0 && 
                    <View>
                        <Text style={styles.title}>Bet Room Admin :</Text>
                        <ScrollView style={ styles.wrapperBetRoom }>
                            <FlatList
                                data={ this.props.state.AuthenticationReducer.betRoomOwner }
                                keyExtractor={ (item) => item._id.toString() }
                                renderItem={ ({item}) => <BetRoom data={item} navigation={this.props.navigation} typeParticipant="owner" /> }
                            />
                        </ScrollView>
                    </View>
                }

                {
                    this.props.state.AuthenticationReducer.betRoomParticipant.length > 0 ?
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