import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';

export default class HeaderDetailsBetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={ styles.backgroundCircle }></View>
                <TextBold style={ styles.title }>{ this.props.title }</TextBold>
                <TextRegular style={ styles.subtitle }>{ this.props.subtitle } paris</TextRegular>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    title: {
        fontSize: 23
    },
    subtitle: {
        opacity: 0.8,
        fontSize: 16
    },
    backgroundCircle: {
        position: 'absolute',
        alignSelf: 'center',
        width: 104,
        height: 104,
        backgroundColor: '#282a4e',
        borderRadius: '50%'
    }
})