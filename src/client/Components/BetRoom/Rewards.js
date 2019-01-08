import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';


class Rewards extends Component {

    handleOnPress = (reward) => {
        const action = { type: "SET_REWARD", value: reward }
        this.props.dispatch(action);
    }

    render() {
        const reward = this.props.state.BetRoomReducer.reward;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.handleOnPress("Restaurant")}
                    style={[styles.wrapperButtonReward, reward === "Restaurant" ? styles.buttonSelect : null]}
                >
                    <Text style={styles.rewardSelect}>Restaurant</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.handleOnPress("Un verre")}
                    style={[styles.wrapperButtonReward, reward === "Un verre" ? styles.buttonSelect : null]}
                >
                    <Text style={styles.rewardSelect}>Un verre</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.handleOnPress("Double les points")}
                    style={[styles.wrapperButtonReward, reward === "Double les points" ? styles.buttonSelect : null]}
                >
                    <Text style={styles.rewardSelect}>Double les points</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.handleOnPress("Bonus")}
                    style={[styles.wrapperButtonReward, reward === "Bonus" ? styles.buttonSelect : null]}
                >
                    <Text style={styles.rewardSelect}>Bonus</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.handleOnPress("Gage")}
                    style={[styles.wrapperButtonReward, reward === "Gage" ? styles.buttonSelect : null]}
                >
                    <Text style={styles.rewardSelect}>Gage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperRewards: {
        display: 'flex',
        flexDirection: 'row'

    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    wrapperButtonReward: {
        margin: 16
    },
    buttonSelect: {
        backgroundColor: '#ccc',
    },
    rewardSelect: {
        fontSize: 20,
        borderWidth: 1,
        padding: 16,
        borderColor: '#ccc'
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

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)