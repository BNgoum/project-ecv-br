import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Friend extends Component {
    render() {
        return (
            <View>
                <Text style={styles.pseudo} >{ this.props.data }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pseudo: {
        alignSelf: 'center',
        fontSize: 14
    }
})