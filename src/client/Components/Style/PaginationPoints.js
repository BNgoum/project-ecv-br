import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';


export default class PaginationPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    displayPagination = () => {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={ [styles.dots, this.props.isActive === 1 && styles.isActive] }></View>
                <View style={ [styles.dots, this.props.isActive === 2 && styles.isActive] }></View>
                <View style={ [styles.dots, this.props.isActive === 3 && styles.isActive] }></View>
                <View style={ [styles.dots, this.props.isActive === 4 && styles.isActive] }></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 14,
        left: '50%',
        transform: [{translateX: 6}],
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dots: {
        backgroundColor: '#282a4e',
        width: 6,
        height: 6,
        borderRadius: 50,
        marginHorizontal: 5
    },
    isActive: {
        backgroundColor: '#fff'
    }
})