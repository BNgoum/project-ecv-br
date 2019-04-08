import React, { Component } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { connect } from "react-redux";

import { requestUserInformationById } from "../../Store/Reducers/User/action";
import { requestPoints } from '../../Store/Reducers/BetRoom/action';

import Match from "./Match";

import Tabs from "../Tabs";
import HeaderDetailsBetRoom from "../Style/HeaderDetailsBetRoom";
import StatusBetRoom from "../Style/StatusBetRoom";
import RewardDetailsBetRoom from '../Style/RewardDetailsBetRoom';
import BlockFriend from '../Style/BlockFriend';
import TextRegular from '../Style/TextRegular';
import TextBold from "../Style/TextBold";

class BetRoomDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      statut: "Pas débuté",
      isDetails: true,
      isMatchs: false,
      totalPoints: 0
    };
  }

  componentDidMount() {
    this.setParticipantsName();

    this.getStatusMatch();

    this.displayNombrePointsGagne();
  }

  getStatusMatch = () => {
    // On récupère tous les status des matchs de cette Bet Room et on les stock dans le state

    const matchs = this.props.state.AuthenticationReducer.currentBetRoom.matchs;
    let arrayStatus = [];

    matchs.map(match => {
      arrayStatus.push(match.statut);
    });

    // On vérifie le contenu du state et on modifie le statut en fonction de cela
    if (arrayStatus.every(val => val === "FINISHED")) {
      this.setState({ statut: "Terminée" });
      //this.calculTotalPoints();
    } else if (
      arrayStatus.includes("IN_PLAY") ||
      arrayStatus.includes("FINISHED")
    ) {
      this.setState({ statut: "En cours" });
    } else {
      this.setState({ statut: "Pas débuté" });
    }
  };

  setParticipantsName = () => {
    const participants = this.props.state.AuthenticationReducer.currentBetRoom.participants;

    participants.push(this.props.state.AuthenticationReducer.userInfo._id);

    participants.map(participant => {
      return new Promise((resolve, reject) => {
        resolve(requestUserInformationById(participant));
      })
        .then(data => {
          this.setState(prevState => ({
            participants: [...prevState.participants, data]
          }));
        })
        .catch(error =>
          console.log(
            "Erreur du map de la fonction setParticipantsName (BetRoomDetails.js) : ",
            error
          )
        );
    });
  };

  // Faire ici le calcul des points des matchs

  handleDisplayTabContent = side => {
    if (side === "first") {
      this.setState({ isDetails: true, isMatchs: false });
    } else {
      this.setState({ isDetails: false, isMatchs: true });
    }
  };

  // On calcul le total des points gagné en fonction des paris
  displayNombrePointsGagne = () => {
    const currentBetRoom = this.props.state.AuthenticationReducer.currentBetRoom;
    const typeParticipant = this.props.state.AuthenticationReducer.typeParticipant;

    const userId = this.props.state.AuthenticationReducer.userInfo._id;
    const idBetRoom = currentBetRoom._id;
    let matchId = "";
    

    let points = 0;

    currentBetRoom.matchs.map(match => {
      matchId = match._id;
      const scoreHTBet = match.scoreHomeTeamInputUser;
      const scoreATBet = match.scoreAwayTeamInputUser;
      const scoreHTFinal = match.scoreHomeTeam;
      const scoreATFinal = match.scoreAwayTeam;
      const gagnant = match.gagnant;

      // Si le score parié est égale au score final = 3 points
      // En cas de match nul / pronostic gagnant réussi = 1 points
      if (scoreHTBet === scoreHTFinal && scoreATBet === scoreATFinal) { points = 3 }
      else if ( 
          scoreATBet === scoreHTBet && gagnant === "DRAW" ||
          scoreATBet > scoreHTBet && gagnant === "AWAY_TEAM" ||
          scoreATBet < scoreHTBet && gagnant === "HOME_TEAM"
      ) { points = 1 }
      else { points = 0 }
    })

    this.setState({totalPoints: points})

    return requestPoints(userId, typeParticipant, idBetRoom, matchId, points);
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

  displayTextStatut = () => {
    if (this.state.statut === "Terminée") {
        return <TextBold style={ styles.textStatut }>La Bet Room est terminée</TextBold>
    } else if (this.state.statut === "En cours") {
        return <TextBold style={ styles.textStatutBis }>La Bet Room est en cours</TextBold>
    } else {
        return <TextBold style={ styles.textStatutBis }>Faites vos pronostics !</TextBold>
    }
  }

  displayContent = () => {
    const betRoomDetails = this.props.state.AuthenticationReducer.currentBetRoom;
    const userId = this.props.state.AuthenticationReducer.userInfo._id;
    const typeParticipant = this.props.state.AuthenticationReducer.typeParticipant;

      if (this.state.isDetails) {
        return <View style={ { flex: 1 } }>
            <StatusBetRoom statut={this.state.statut} />

            <RewardDetailsBetRoom reward={betRoomDetails.reward} />

            <View style={styles.wrapperParticipants}>
                <Image style={ styles.iconParticipant } source={require('../../../assets/images/tab_bar/participant.png')} resizeMode={"contain"}/>
                <TextRegular style={styles.textParticipant}>Participants ({this.state.participants.length}) </TextRegular>
            </View>

            {
                this.state.participants.length > 0 && 
                <FlatList
                    data={this.state.participants}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => <BlockFriend friend={item.pseudo}></BlockFriend>}
                />
            }
        </View>
      } else {
        return <View style={ { flex: 1 } }>
            { this.displayTextStatut() }

            { this.state.statut === "Terminée" && <TextRegular style={styles.totalPointsText}>Nombre de point(s) gagné(s) : { this.state.totalPoints }</TextRegular>}

            <FlatList
                data={betRoomDetails.matchs}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item }) => (
                  <Match
                    data={item}
                    betRoom={betRoomDetails}
                    userId={userId}
                    typeParticipant={typeParticipant}
                  />
                )}
            />
        </View>
      }
  }

  render() {
    const betRoomDetails = this.props.state.AuthenticationReducer.currentBetRoom;
    
    return (
      <View style={styles.container}>
        <HeaderDetailsBetRoom
          title={betRoomDetails.name}
          subtitle={betRoomDetails.betsNumber}
          style={styles.headerComponent}
        />

        <Tabs
          firstTab="Détails"
          secondTab="Matchs"
          displayTabContent={this.handleDisplayTabContent}
        />

        { this.displayContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    flex: 1
  },
  headerComponent: {
    marginBottom: 50
  },
  title: {
    fontSize: 20,
    alignSelf: "center"
  },
  wrapperBet: {
    marginTop: 8,
    marginBottom: 8
  },
  wrapperReward: {
    marginTop: 8,
    marginBottom: 8
  },
  wrapperIsBegin: {
    marginTop: 8,
    marginBottom: 8
  },
  wrapperParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  iconParticipant: {
    width: 11,
    height: 12,
    marginRight: 8
  },
  textParticipant: {
      color: '#f1f1f1',
      fontSize: 13
  },
  textStatut: {
      fontSize: 22,
      marginTop: 22,
      textAlign: 'center'
  },
  textStatutBis: {
      fontSize: 22,
      marginVertical: 22,
      textAlign: 'center'
  },
  totalPointsText: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 22,
  }
});

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(BetRoomDetails);
