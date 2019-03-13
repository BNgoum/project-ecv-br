import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import TextRegular from '../Components/Style/TextRegular';
import TextBold from '../Components/Style/TextBold';

export default class TabResearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstActive: true,
            isSecondActive: false,
            isThirdActive: false,
        }
    }

    handleOnPressTab = side => {
        if (side === "first") {
            this.setState({
                isFirstActive: true,
                isSecondActive: false,
                isThirdActive: false,
            })
            this.props.displayTabContent("first");
        } else if (side === "second") {
            this.setState({
                isFirstActive: false,
                isSecondActive: true,
                isThirdActive: false,
            })
            this.props.displayTabContent("second");
        } else {
            this.setState({
                isFirstActive: false,
                isSecondActive: false,
                isThirdActive: true,
            })
            this.props.displayTabContent("third");
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity onPress={ () => this.handleOnPressTab("first") } style={ styles.wrapperTab }>
                    <TextRegular style={ [styles.title, this.state.isFirstActive && styles.titleActive] }>En cours</TextRegular>
                    <View style={ this.state.isFirstActive && styles.borderBottomActive }></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.handleOnPressTab("second") } style={ styles.wrapperTab }>
                    <Text style={ [styles.title, this.state.isSecondActive && styles.titleActive] }>À venir</Text>
                    <View style={ this.state.isSecondActive && styles.borderBottomActive }></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.handleOnPressTab("third") } style={ styles.wrapperTab }>
                    <Text style={ [styles.title, this.state.isThirdActive && styles.titleActive] }>Terminée</Text>
                    <View style={ this.state.isThirdActive && styles.borderBottomActive }></View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        paddingBottom: 12,
        color: '#fff',
        opacity: 0.5
    },
    titleActive: {
        fontFamily: 'pt-bold',
        opacity: 1
    },
    borderBottom: {
        width: '100%',
        height: 2,
        backgroundColor: '#9b9b9b'
    },
    borderBottomActive: {
        width: '60%',
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 50,
        alignSelf: 'center'
    },
    wrapperTab: {
        // paddingTop: 16,
        // paddingBottom: 0,
        // paddingRight: 20,
        // paddingLeft: 20,
    }
})
