import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import Friend from './Friend';
import TextBold from '../Style/TextBold';

export default class Pending extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TextBold style={styles.title} >En attente : </TextBold>

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
        fontSize: 18,
        marginTop: 12,
        marginBottom: 12
    }
})