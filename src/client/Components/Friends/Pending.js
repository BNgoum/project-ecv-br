import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import Friend from './Friend';

export default class Pending extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >En attente : </Text>

                <FlatList
                    data={ this.props.friends }
                    keyExtractor={ (item) => item._id.toString() }
                    renderItem={ ({item}) => <Friend data={item.pseudo} /> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginBottom: 8
    }
})