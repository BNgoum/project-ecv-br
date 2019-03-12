import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';

import TextBold from '../../Components/Style/TextBold';
import TextRegular from '../../Components/Style/TextRegular';
import StepNumber from '../../Components/Style/StepNumber';
import StepNumberContainer from '../../Components/Style/StepNumberContainer';
import PaginationPoints from '../../Components/Style/PaginationPoints';

class Rewards extends Component {

    handleOnPress = (reward) => {
        const action = { type: "SET_REWARD", value: reward }
        this.props.dispatch(action);
    }

    render() {
        const reward = this.props.state.BetRoomReducer.reward;
        return (
            <View style={ styles.container }>
                <StepNumberContainer><StepNumber>2</StepNumber></StepNumberContainer>
                <TextBold style={ styles.title }>Choisis la récompense</TextBold>

                <View style={ styles.wrapperRewards }>
                    <TouchableOpacity
                        onPress={() => this.handleOnPress("Restaurant")}
                        style={[styles.wrapperButtonReward, reward === "Restaurant" && styles.buttonSelect]}
                    >
                        <Image style={ [styles.pictoStyle, reward === "Restaurant" ? styles.rewardSelected : styles.rewardUnselected] } source={require('../../Images/new_bet_room/restaurant.png')}/>
                        <TextRegular style={styles.rewardText}>Restaurant</TextRegular>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.handleOnPress("Un verre")}
                        style={[styles.wrapperButtonReward, reward === "Un verre" && styles.buttonSelect]}
                    >
                        <Image style={ styles.pictoStyle } source={require('../../Images/new_bet_room/verre.png')}/>
                        <TextRegular style={styles.rewardText}>Un verre</TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={ styles.wrapperRewards }>
                    <TouchableOpacity
                        onPress={() => this.handleOnPress("Double les points")}
                        style={[styles.wrapperButtonReward, reward === "Double les points" && styles.buttonSelect]}
                    >
                        <Image style={ [styles.pictoStyle, styles.pictoDoublePoints] } source={require('../../Images/new_bet_room/double_points.png')}/>
                        <TextRegular style={styles.rewardText}>Double points</TextRegular>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.handleOnPress("Gage")}
                        style={[styles.wrapperButtonReward, reward === "Gage" && styles.buttonSelect]}
                    >
                        <Image style={ [styles.pictoStyle, styles.pictoGage] } source={require('../../Images/new_bet_room/gage.png')}/>
                        <TextRegular style={styles.rewardText}>Gage</TextRegular>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        paddingHorizontal: 40
    },
    wrapperRewards: {
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 25,
        marginTop: 4
    },
    wrapperButtonReward: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 112,
        height: 110,
        padding: 12,
        marginHorizontal: 6,
        backgroundColor: '#282a4e',
        borderRadius: 5,
    },
    buttonSelect: {
        borderWidth: 1,
        borderColor: '#9b9b9b',
    },
    pictoStyle: {
        width: '50%',
        height: '50%',
    },
    wrapperRewards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8
    },
    rewardText: {
        fontSize: 14,
        marginTop: 8
    },
    pictoDoublePoints: {
        width: 56,
        height: 48,
    },
    pictoGage: {
        width: 54,
        height: 31,
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