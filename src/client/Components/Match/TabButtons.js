import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';

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
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/ligue_des_champions.png')}/>
                    <View style={ isActive === "LDC" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("Ligue1")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/ligue_1.png')}/>
                    <View style={ isActive === "Ligue1" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.wrapperButton} 
                onPress={() => this.handleOnPress("LaLiga")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/la_liga.png')}/>
                    <View style={ isActive === "LaLiga" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("PremierLeague")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/premier_league.png')}/>
                    <View style={ isActive === "PremierLeague" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("SerieA")}>
                    <Image 
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/serie_a.png')}/>
                    <View style={ isActive === "SerieA" && styles.isSelected }></View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wrapperButton} 
                    onPress={() => this.handleOnPress("Bundesliga")}>
                    <Image
                        style={styles.pictoLeague} 
                        source={require('../../Images/leagues/bundesliga.png')}/>
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
        width: '20%',
        alignItems: 'center'
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
        height: 50,
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