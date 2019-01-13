import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Friend extends Component {
    render() {
        return (
            <View style={ styles.wrapperPseudo }>
                <Text style={styles.pseudo} >{ this.props.data }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperPseudo: {
        borderWidth: 1,
        marginBottom: 8,
        backgroundColor: '#fff'
    },
    pseudo: {
        alignSelf: 'center',
        fontSize: 16,
        padding: 8,
    }
})