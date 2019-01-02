import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

class MatchsSelected extends Component {
    render() {
        const numberBets = this.props.state.BetRoomReducer.numberBets;
        return (
            <View style={styles.wrapperContent}>
                { numberBets > 1 ? 
                    <Text style={styles.label}>{numberBets} matchs sélectionnés</Text> :
                    <Text style={styles.label}>{numberBets} match sélectionné</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        backgroundColor: '#f7f7f7',
        padding: 16,
    },
    label: {
        fontSize: 18,
        alignSelf: 'center'
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

export default connect(mapStateToProps)(MatchsSelected)