import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { requestSetScore, requestUpdateMatch, requestPoints } from '../../Store/Reducers/BetRoom/action';
import { requestGetMatch } from '../../Store/Reducers/Match/action';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreHomeTeam: this.props.data.scoreHomeTeamInputUser,
            scoreAwayTeam: this.props.data.scoreAwayTeamInputUser,
            isDisabled : true,
            isBegin: false,
            statut: "Pas débuté"
        }
    }

    componentDidMount() {
        const statut = this.props.data.statut;

        if ( statut === "IN_PLAY" || statut === "LIVE" || statut === "PAUSED") {
            this.setState({isBegin: true, statut: "En cours"})
        } else if (statut === "FINISHED") {
            this.setState({isBegin: true, statut: "Terminée"})
            //this.calculPoints();
        }
    }

    // On calcul le total des points gagné en fonction du pari
    // calculPoints = () => {
    //     const userId = this.props.userId;
    //     const typeParticipant = this.props.typeParticipant;
    //     const idBetRoom = this.props.betRoom._id;
    //     const matchId = this.props.data._id;
    //     const scoreHTBet = this.props.data.scoreHomeTeamInputUser;
    //     const scoreATBet = this.props.data.scoreAwayTeamInputUser;
    //     const scoreHTFinal = this.props.data.scoreHomeTeam;
    //     const scoreATFinal = this.props.data.scoreAwayTeam;
    //     const gagnant = this.props.data.gagnant;

    //     let points = 0;

    //     // Si le score parié est égale au score final = 3 points
    //     // En cas de match nul / pronostic gagnant réussi = 1 points
    //     if (scoreHTBet === scoreHTFinal && scoreATBet === scoreATFinal) { points = 3 }
    //     else if ( 
    //         scoreATBet === scoreHTBet && gagnant === "DRAW" ||
    //         scoreATBet > scoreHTBet && gagnant === "AWAY_TEAM" ||
    //         scoreATBet < scoreHTBet && gagnant === "HOME_TEAM"
    //     ) { points = 1 }
    //     else { points = 0 }

    //     console.log('Points pour le match ', this.props.data.homeTeam, this.props.data.awayTeam, ', point gagnés : ', points)
    //     console.log('Details pour le match : ', userId, ', ', idBetRoom, ', ', matchId)

    //     // Appel à la fonction 
    //     return requestPoints(userId, typeParticipant, idBetRoom, matchId, points);
    // }

    handleOnPressScore = (type, team) => {
        if ( type === "plus" && team === "scoreHomeTeam" ) {
            this.setState({ scoreHomeTeam: this.state.scoreHomeTeam + 1, isDisabled: false })
        } else if ( type === "plus" && team === "scoreAwayTeam" ) {
            this.setState({ scoreAwayTeam: this.state.scoreAwayTeam + 1, isDisabled: false })
        } else if ( type === "moins" && team === "scoreAwayTeam" ) {
            if ( this.state.scoreAwayTeam > 0 )
                this.setState({ scoreAwayTeam: this.state.scoreAwayTeam - 1, isDisabled: false })
        } else {
            if ( this.state.scoreHomeTeam > 0 )
                this.setState({ scoreHomeTeam: this.state.scoreHomeTeam - 1, isDisabled: false })
        }
    }

    handleOnPressValidate = () => {
        return new Promise((resolve, reject) => {
            const userId = this.props.userId;
            const typeParticipant = this.props.typeParticipant;
            const betRoomId = this.props.betRoom._id;
            const matchId = this.props.data._id;
            const homeTeamScore = this.state.scoreHomeTeam;
            const awayTeamScore = this.state.scoreAwayTeam;

            resolve(requestSetScore(userId, typeParticipant, betRoomId, matchId, homeTeamScore, awayTeamScore))
        })
        .then(() => this.setState({ isDisabled: true }))
        .catch((error) => console.log('Erreur de la promise handleOnPressValidate (Match.js) : ', error))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapperDate}>
                    <View style={styles.ligneVerticaleTop}></View>
                    <Text style={styles.dateMatch}>{this.props.data.dateMatch}</Text>
                    <Text style={styles.dateMatch}>{this.props.data.heureMatch}</Text>
                </View>

                {/* <View style={styles.wrapperTeams}>
                    <Text style={styles.nameTeam}>{this.props.data.homeTeam}</Text>
                    <Text style={styles.versusText}>VS</Text>
                    <Text style={styles.nameTeam}>{this.props.data.awayTeam}</Text>
                </View> */}

                <View style={ styles.wrapperInfoTeams }>
                    <View style={[styles.wrapperHomeTeam, !this.state.isBegin && styles.largeBlock]}>
                    <View>

                    {
                        this.state.isBegin &&
                        <View style={ styles.wrapperResultatHomeTeam }>
                            <TextRegular style={ styles.scoreResultatHomeTeam }>Résultat</TextRegular>
                            <TextRegular style={ styles.scoreResultatHomeTeam }>{this.props.data.scoreAwayTeam}</TextRegular>
                        </View>
                    }         

                        <View style={[styles.wrapperHomeTeamScore, !this.state.isBegin && styles.centerBlock]}>
                            { this.state.isBegin && <TextRegular style={ styles.textMonPronostic }>Mon pronostic</TextRegular> }

                            {
                                !this.state.isBegin &&
                                <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreHomeTeam") } style={ styles.wrapperButtonScore }>
                                    <TextRegular style={styles.buttonScore}>-</TextRegular>
                                </TouchableOpacity>
                            }

                            <TextBold style={styles.teamScore}>{this.state.scoreHomeTeam}</TextBold>

                            {
                                !this.state.isBegin &&
                                <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreHomeTeam") } style={ styles.wrapperButtonScore }>
                                    <TextRegular style={styles.buttonScore}>+</TextRegular>
                                </TouchableOpacity>
                            }
                        </View>

                        {
                            !this.state.isBegin && 
                            <TouchableOpacity onPress={this.handleOnPressValidate} style={[styles.buttonValidatePronostic, this.state.isDisabled ? styles.isDisabled : null]} disabled={this.state.isDisabled}><TextRegular style={ styles.textButtonValidate }>Valider le pronostic</TextRegular></TouchableOpacity>
                        }
                        </View>
                        
                        <TextBold style={styles.nameTeam}>{this.props.data.homeTeam}</TextBold>
                    </View>


                    <View style={styles.separateurTeams}>
                        <View style={styles.ligneVerticaleBottom}></View>
                        <TextBold style={styles.separateurDots}>:</TextBold>
                    </View>


                    <View style={[styles.wrapperAwayTeam, !this.state.isBegin && styles.largeBlock]}>
                        <View>
                            {
                                this.state.isBegin &&
                                <View style={ styles.wrapperResultatAwayTeam }>
                                    <TextRegular style={ styles.scoreResultatHomeTeam }>Résultat</TextRegular>
                                    <TextRegular style={ styles.scoreResultatHomeTeam }>{this.props.data.scoreAwayTeam}</TextRegular>
                                </View>
                            }

                            <View style={[styles.wrapperAwayTeamScore, !this.state.isBegin && styles.centerBlock]}>

                                {
                                    this.state.isBegin &&
                                    <TextRegular style={ styles.textMonPronosticAwayTeam }>Mon pronostic</TextRegular>
                                }

                                {
                                    !this.state.isBegin && 
                                    <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><TextRegular style={styles.buttonScore}>-</TextRegular></TouchableOpacity>
                                }

                                <TextBold style={styles.teamScore}>{this.state.scoreAwayTeam}</TextBold>

                                {
                                    !this.state.isBegin && 
                                    <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><TextRegular style={styles.buttonScore}>+</TextRegular></TouchableOpacity>
                                }
                            </View>

                            {
                                !this.state.isBegin && 
                                <TouchableOpacity onPress={this.handleOnPressValidate} style={[styles.buttonValidatePronostic, this.state.isDisabled ? styles.isDisabled : null]} disabled={this.state.isDisabled}><TextRegular style={ styles.textButtonValidate }>Valider le pronostic</TextRegular></TouchableOpacity>
                            }
                        </View>

                        <TextBold style={styles.nameTeam}>{this.props.data.awayTeam}</TextBold>
                    </View>
                </View>
                



                {/* <View style={styles.wrapperScore}>
                    <View style={styles.wrapperTeamScore}>
                        {
                            !this.state.isBegin &&
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreHomeTeam") } style={ styles.wrapperButtonScore }>
                                <Text style={styles.buttonScore}>-</Text>
                            </TouchableOpacity>
                        }

                        <Text style={styles.teamScore}>{this.state.scoreHomeTeam}</Text>

                        {
                            !this.state.isBegin &&
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreHomeTeam") } style={ styles.wrapperButtonScore }>
                                <Text style={styles.buttonScore}>+</Text>
                            </TouchableOpacity>
                        }
                        
                    </View>

                    <Text style={styles.versusText}>|</Text>

                    <View style={styles.wrapperTeamScore}>
                        {
                            this.state.isBegin ? null : 
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("moins", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>-</Text></TouchableOpacity>
                        }

                        <Text style={styles.teamScore}>{this.state.scoreAwayTeam}</Text>
                        
                        {
                            this.state.isBegin ? null : 
                            <TouchableOpacity onPress={ () => this.handleOnPressScore("plus", "scoreAwayTeam") } style={ styles.wrapperButtonScore }><Text style={styles.buttonScore}>+</Text></TouchableOpacity>
                        }
                    </View>
                </View> */}

                {/* {
                    this.state.statut === "Terminée" && 
                    <View>
                        <Text style={ styles.titleScoreFinal }>Score final</Text>
                        <View style={ styles.wrapperScoreFinal }>
                            <Text style={styles.teamScore}>{this.props.data.scoreHomeTeam}</Text>
                            <Text>|</Text>
                            <Text style={styles.teamScore}>{this.props.data.scoreAwayTeam}</Text>
                        </View>
                    </View>
                }
                
                {
                    !this.state.isBegin && 
                    <TouchableOpacity onPress={this.handleOnPressValidate} style={[styles.buttonValidatePronostic, this.state.isDisabled ? styles.isDisabled : null]} disabled={this.state.isDisabled}><Text>Valider le pronostic</Text></TouchableOpacity>
                } */}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginVertical: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    wrapperDate: {
      justifyContent: "center",
      alignItems: 'center'
    },
    dateMatch: {
      fontSize: 12,
      color: '#fff'
    },
    wrapperTeams: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    nameTeam : {
        fontSize: 18,
        color: '#fff'
    },
    versusText: {
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        textAlign: 'center'
    },
    wrapperScore: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    wrapperTeamScore: {
        textAlign: 'center',
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamScore: {
        fontSize: 27,
    },
    buttonScore: {
        fontSize: 24,
        marginRight: 8,
        marginLeft: 8,
    },
    wrapperButtonScore: {
        borderRadius: 7,
        marginHorizontal: 12,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2539ff'
    },
    buttonValidatePronostic: {
        alignSelf: 'center',
        backgroundColor: '#2539ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 7
    },
    isDisabled: {
        opacity: 0.4
    },
    wrapperScoreFinal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleScoreFinal: {
        fontSize: 14,
        alignSelf: 'center'
    },
    wrapperHomeTeam: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#242647',
        borderRadius: 7,
        width: '47%',
        height: 165,
        paddingVertical: 16,
        paddingHorizontal: 20
    },
    wrapperHomeTeamScore: {
        position: 'relative',
        flexDirection: 'row',
        paddingTop: 8,
        justifyContent: 'flex-end'
    },
    wrapperAwayTeamScore: {
        position: 'relative',
        flexDirection: 'row',
        paddingTop: 8
    },
    wrapperAwayTeam: {
        justifyContent: 'space-between',
        backgroundColor: '#242647',
        borderRadius: 7,
        width: '47%',
        height: 165,
        paddingVertical: 16,
        paddingHorizontal: 20
    },
    wrapperInfoTeams: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 5
    },
    separateurTeams: {
        position: 'relative',
        width: '6%',
    },
    separateurDots: {
        textAlign: 'center',
        fontSize: 25,
    },
    ligneVerticaleBottom: {
        position: 'absolute',
        left: '50%',
        bottom: -185,
        height: 180,
        width: 1,
        backgroundColor: '#fff',
    },
    ligneVerticaleTop: {
        position: 'absolute',
        left: '50%',
        top: -30,
        height: 25,
        width: 1,
        backgroundColor: '#fff',
    },
    centerBlock: {
        // alignSelf: 'center',
        // alignItems: 'space-between',
        marginBottom: 8
    },
    largeBlock: {
        height: 160
    },
    textButtonValidate: {
        fontSize: 12
    },
    wrapperResultatHomeTeam: {
        alignItems: 'flex-end',
        marginBottom: 8
    },
    wrapperResultatAwayTeam: {
        alignItems: 'flex-start',
        marginBottom: 8
    },
    scoreResultatHomeTeam: {
        fontSize: 12
    },
    textMonPronostic: {
        position: 'absolute',
        top: -10,
        right: 0,
        fontSize: 12
    },
    textMonPronosticAwayTeam: {
        position: 'absolute',
        top: -10,
        left: 0,
        fontSize: 12
    },
    teamScoreRight: {
        alignSelf: 'flex-end'
    }
})