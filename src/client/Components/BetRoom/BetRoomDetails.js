import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView, Image } from "react-native";

import { connect } from "react-redux";

import { requestUserInformationById } from "../../Store/Reducers/User/action";
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
      isMatchs: false
    };
  }

  componentDidMount() {
    this.setParticipantsName();

    this.getStatusMatch();
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
    const participants = this.props.state.AuthenticationReducer.currentBetRoom
      .participants;

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

  displayTextStatut = () => {
    if (this.state.statut === "Terminée") {
        return <TextBold style={ styles.textStatut }>La Bet Room est terminée</TextBold>
    } else if (this.state.statut === "En cours") {
        return <TextBold style={ styles.textStatut }>La Bet Room est en cours</TextBold>
    } else {
        return <TextBold style={ styles.textStatut }>Faites vos pronostics !</TextBold>
    }
  }

  displayContent = () => {
    const betRoomDetails = this.props.state.AuthenticationReducer
    .currentBetRoom;
    const userId = this.props.state.AuthenticationReducer.userInfo._id;
    const typeParticipant = this.props.state.AuthenticationReducer
      .typeParticipant;
      if (this.state.isDetails) {
        return <View>
            <StatusBetRoom statut={this.state.statut} />

            <RewardDetailsBetRoom reward={betRoomDetails.reward} />

            <View style={styles.wrapperParticipants}>
                <Image style={ styles.iconParticipant } source={require('../../Images/tab_bar/participant.png')} resizeMode={"contain"}/>
                <TextRegular style={styles.textParticipant}>Participants ({this.state.participants.length + 1}) </TextRegular>
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
    const betRoomDetails = this.props.state.AuthenticationReducer
      .currentBetRoom;
    const userId = this.props.state.AuthenticationReducer.userInfo._id;
    const typeParticipant = this.props.state.AuthenticationReducer.typeParticipant;
    return (
      <View style={styles.container}>
        <HeaderDetailsBetRoom
          title={betRoomDetails.name}
          subtitle={betRoomDetails.betsNumber}
          style={styles.headerComponent}
        />
        {/* <Text style={ styles.title }>{ betRoomDetails.name }</Text>

                <View style={ styles.wrapperBet }>
                    <Text>{ betRoomDetails.betsNumber } pari</Text>
                </View> */}

        <Tabs
          firstTab="Détails"
          secondTab="Matchs"
          displayTabContent={this.handleDisplayTabContent}
        />

        {/* <View style={ styles.wrapperIsBegin }>
                    <Text>Statut: { this.state.statut }</Text>
                </View> */}

        { this.displayContent() }

        {/* <View style={styles.wrapperReward}>
          <Text>Récompense : {betRoomDetails.reward}</Text>
        </View> */}        
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
      color: '#6b6d8a',
      fontSize: 13
  },
  textStatut: {
      fontSize: 22,
      marginVertical: 22,
      textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(BetRoomDetails);
