import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

class MatchInComing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            isBegin: false
        }
    }

    render() {
        return (
            <View style={ styles.wrapperMatch }>
                <View style={styles.wrapperDate}>
                    <TextRegular style={styles.dateMatch}>{this.props.matchs.dateMatch}</TextRegular>
                    <TextRegular style={styles.dateMatch}>{this.props.matchs.heureMatch}</TextRegular>
                </View>
                <View style={styles.wrapperTeams}>
                    <TextBold style={styles.nameTeam}>{this.props.matchs.homeTeam}</TextBold>
                    <TextRegular style={styles.versusText}>VS</TextRegular>
                    <TextBold style={styles.nameTeam}>{this.props.matchs.awayTeam}</TextBold>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperMatch: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 0,
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 7,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        // backgroundColor: 'rgba(40, 42, 78, 0.7)',
        // backgroundColor: '#1d1e31',
        backgroundColor: '#242647',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.45,
        shadowRadius: 2.84,
        elevation: 5,
    },
    wrapperDate: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'
    },
    dateMatch: {
      fontSize: 11
    },
    wrapperTeams: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    nameTeam : {
        fontSize: 14,
        flex: 2,
        textAlign: 'center'
    },
    versusText: {
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        textAlign: 'center',
        fontSize: 12
    },
    isBegin: {
        opacity: 0.4
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchInComing)