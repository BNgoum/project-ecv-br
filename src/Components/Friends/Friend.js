import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import TextBold from '../Style/TextBold';
import TextRegular from '../Style/TextRegular';
import { AntDesign } from '@expo/vector-icons';

export default class Friend extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.avatar }>
                    <AntDesign name="user" size={32} color="black" />
                </View>
                <View style={ styles.wrapperText }>
                    <TextBold style={styles.pseudo} >{ this.props.data }</TextBold>
                    <TextRegular style={styles.sousTexte} >4 Bet Rooms joués ensemble</TextRegular>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 4,
        backgroundColor: '#242647',
        paddingHorizontal: 20,
        paddingVertical: 12 
    },
    pseudo: {
        fontSize: 16
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginRight: 20
    },
    wrapperText: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    sousTexte: {
        fontSize: 12
    }
})