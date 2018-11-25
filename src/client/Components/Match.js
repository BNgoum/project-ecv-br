import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class Match extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <View style={styles.wrapperMatch}>
                <View style={styles.wrapperDate}>
                    <Text style={styles.dateMatch}>{this.props.matchs.dateMatch}</Text>
                    <Text style={styles.heureMatch}>{this.props.matchs.heureMatch}</Text>
                </View>
                <View style={styles.wrapperTeams}>
                    <Text style={styles.nameTeam}>{this.props.matchs.homeTeam}</Text>
                    <Text style={styles.versusText}>VS</Text>
                    <Text style={styles.nameTeam}>{this.props.matchs.awayTeam}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperMatch: {
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16
    },
    wrapperDate: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'
    },
    dateMatch: {
      fontSize: 18
    },
    wrapperTeams: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    nameTeam : {
        fontSize: 18,
        flex: 2,
        textAlign: 'center'
    },
    versusText: {
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        textAlign: 'center'
    }
})