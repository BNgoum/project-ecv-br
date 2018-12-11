import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Friends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Mes amis</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 22
    }
})