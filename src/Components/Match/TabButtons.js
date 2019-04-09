import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Bundesliga, LDC, Liga, Ligue1, PremierLeague, SerieA } from '../../Images/championnats';

class TabButtons extends Component {

    handleOnPress = (championnat) => {
        const action = { type: "IS_ACTIVE", value: championnat }
        this.props.dispatch(action);
    }

    render() {
        const isActive = this.props.state.MatchReducer.isActive;
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("LDC")}>
                        <LDC style={styles.pictoLeague} />
                    <View style={ isActive === "LDC" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("Ligue1")}>
                    <Ligue1 style={styles.pictoLeague} />
                    <View style={ isActive === "Ligue1" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.wrapperButton, styles.centerSvg]} 
                onPress={() => this.handleOnPress("LaLiga")}>
                        <Liga style={styles.pictoLeague} />
                    <View style={ isActive === "LaLiga" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.wrapperButton, styles.centerSvg]} 
                    onPress={() => this.handleOnPress("PremierLeague")}>
                        <PremierLeague style={styles.pictoLeague} />
                    <View style={ isActive === "PremierLeague" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("SerieA")}>
                        <SerieA style={styles.pictoLeague} />
                    <View style={ isActive === "SerieA" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("Bundesliga")}>
                        <Bundesliga style={styles.pictoLeague} />
                    <View style={ isActive === "Bundesliga" && styles.isSelected }></View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: "#dedede",
        backgroundColor: '#fff',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        paddingVertical: 8
    },
    wrapperButton: {
        position: 'relative',
        padding: 6,
        flex: 1,
        overflow: 'hidden'
    },
    isSelected: {
        position: 'absolute',
        bottom: -2,
        alignSelf: 'center',
        width: 16,
        height: 4,
        backgroundColor: '#ff450c',
        borderRadius: 50,
    },
    pictoLeague: {
        width: 50,
        height: 60,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    centerSvg: {
        paddingLeft: 16
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabButtons)