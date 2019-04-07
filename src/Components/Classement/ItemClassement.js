import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import TextBold from '../Style/TextBold';
import TextRegular from '../Style/TextRegular';

export default class ItemClassement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }
    
    render() {
        const data = this.props.data;

        return (
            <View style={ styles.container }>
                <View style={ styles.containerUser }>
                    <TextBold style={ styles.numeroClassement }>{ data.rang }</TextBold>
                    <View style={ styles.avatar }></View>
                    <TextRegular style={ styles.pseudo }>{ data.pseudo }</TextRegular>
                </View>

                <TextBold style={ styles.totalPoints }>{ data.totalPoints }</TextBold>
                <View style={ styles.bottomBar }></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    bottomBar: {
        position: 'absolute',
        width: '100%',
        height: 1,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        opacity: 0.1
    },
    containerUser: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    title: {
        fontSize: 18,
        alignSelf: 'center',
        marginHorizontal: 20
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "red",
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 16
    },
    numeroClassement: {
        fontSize: 18,
        marginRight: 16
    },
    pseudo: {
        fontSize: 16
    },
    totalPoints: {
        fontSize: 18,
        paddingRight: 20
    }
})