import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

export default class StatusBetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    displayStatus = () => {
        if (this.props.statut === "Terminée") {
            return <View style={ styles.wrapperStatus }>
                <View style={ [styles.badgeStatus, styles.badgeEnd] }></View>
                <TextBold style={ styles.statusText }>Terminée</TextBold>
            </View>
        } else if (this.props.statut === "En cours") {
            return <View style={ styles.wrapperStatus }>
                <View style={ [styles.badgeStatus, styles.badgePending] }></View>
                <TextBold style={ styles.statusText }>En cours</TextBold>
            </View>
        } else {
            return <View style={ styles.wrapperStatus }>
                <View style={ [styles.badgeStatus, styles.badgeNotBegin] }></View>
                <TextBold style={ styles.statusText }>A venir</TextBold>
            </View>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextRegular style={ styles.subtitle }>Statut</TextRegular>
                { this.displayStatus() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        marginVertical: 30,
    },
    wrapperStatus: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText: {
        fontSize: 18
    },
    badgeStatus: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        marginRight: 10
    },
    badgeEnd: {
        backgroundColor: '#ff450c'
    },
    badgePending: {
        backgroundColor: '#11F911'
    },
    badgeNotBegin: {
        backgroundColor: '#2539ff'
    },
    subtitle: {
        color: '#6b6d8a',
        fontSize: 13,
        marginBottom: 5
    }
})