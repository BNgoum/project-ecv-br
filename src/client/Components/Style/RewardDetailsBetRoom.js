import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import TextRegular from './TextRegular';
import TextBold from './TextBold';

export default class RewardDetailsBetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    displayReward = () => {
        if (this.props.reward === "Restaurant") {
            return <View style={ styles.wrapperReward }>
                <View style={ styles.wrapperPicto } >
                    <Image style={ styles.pictoStyle } source={require('../../Images/new_bet_room/restaurant.png')} />
                </View>
                
                <View style={ styles.wrapperRewardText }>
                    <TextRegular style={ styles.subtitle }>Récompense</TextRegular>
                    <TextBold style={ styles.title }>Un restau'</TextBold>
                </View>
            </View>
        } else if (this.props.reward === "Un verre") {
            return <View style={ styles.wrapperReward }>
                <View style={ styles.wrapperPicto } >
                    <Image style={ styles.pictoStyle } source={require('../../Images/new_bet_room/verre.png')} />
                </View>
                
                <View style={ styles.wrapperRewardText }>
                    <TextRegular style={ styles.subtitle }>Récompense</TextRegular>
                    <TextBold style={ styles.title }>Un verre</TextBold>
                </View>
            </View>
        } else if (this.props.reward === "Double les points") {
            return <View style={ styles.wrapperReward }>
                <View style={ styles.wrapperPicto } >
                    <Image style={ styles.pictoStyle } source={require('../../Images/new_bet_room/double_points.png')} />
                </View>                
                
                <View style={ styles.wrapperRewardText }>
                    <TextRegular style={ styles.subtitle }>Récompense</TextRegular>
                    <TextBold style={ styles.title }>Points doublés</TextBold>
                </View>
            </View>
        } else {
            return <View style={ styles.wrapperReward }>
                <View style={ styles.wrapperPicto } >
                    <Image style={ styles.pictoStyle } source={require('../../Images/new_bet_room/gage.png')} />
                </View>
                <View style={ styles.wrapperRewardText }>
                    <TextRegular style={ styles.subtitle }>Récompense</TextRegular>
                    <TextBold style={ styles.title }>Un gage</TextBold>
                </View>
            </View>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                { this.displayReward() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        paddingVertical: 30,
        paddingHorizontal: 34,
        marginBottom: 30,
        borderRadius: 7,
        backgroundColor: '#242647'
    },
    wrapperReward: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperPicto: {
        width: 50,
        height: 50,
        marginRight: 38,
        position: 'absolute',
        left: 0
    },
    pictoStyle: {
        width: '100%',
        height: '100%',
        marginRight: 38
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        fontSize: 13,
        color: '#6b6d8a',
        marginBottom: 6
    },
    wrapperRewardText: {
        alignSelf: 'center'
    }
})