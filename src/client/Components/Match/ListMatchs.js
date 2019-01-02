import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Match from './Match';
import TabButtons from './TabButtons';
import {requestLigue1Matchs, requestPremierLeagueMatchs, requestBundesligaMatchs, requestSerieAMatchs, requestLigueDesChampionsMatchs, requestLaLigaMatchs, requestFetchMatchs} from '../../Store/Reducers/Match/action'
const moment = require('moment');

import MatchsSelected from '../../Components/BetRoom/MatchsSelected';

class ListMatchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchs : [],
            Ligue1: [],
            PremierLeague: [],
            Bundesliga: [],
            SerieA: [],
            LaLiga: [],
            LiguedesChampions: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getMatchs();
    }

    getMatchs = () => {
        return new Promise ((resolve, reject) => { resolve(requestLigueDesChampionsMatchs()) })
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestLigue1Matchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestLaLigaMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestPremierLeagueMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestBundesligaMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .then(() => requestSerieAMatchs() )
        .then((action) => {this.props.dispatch(action)})
        .catch((error) => console.log('Erreur lors de l\'affichage des matchs de la semaine', error))
    }

    fetchMatchs = () => {
        let today = moment().format('YYYY-MM-DD');
        let nextWeek = moment(today).add(7, 'days').format('YYYY-MM-DD');
        return new Promise ((resolve, reject) => { resolve(requestFetchMatchs(today, nextWeek)) })
        .then(() => { this.getMatchs() })
        .catch((error) => console.log('Erreur lors du fetch des matchs dans le composant ListMatchs : ', error))
    }

    render() {
        const numberBets = this.props.state.BetRoomReducer.numberBets;
        return (
            <View style={styles.wrapperContent}>
                <View>
                    <TabButtons />
                </View>
                <ScrollView>
                    <TouchableOpacity
                        onPress={this.fetchMatchs}
                        style={styles.buttonLoad}>
                        <Image style={styles.icon} source={require('../../Images/matchs/refresh.png')}/>
                    </TouchableOpacity>

                    { this.props.state.MatchReducer.isActive === "LDC" ? 
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_des_champions.png')}/>
                                <Text style={styles.titreLeague}>Ligue des Champions</Text>
                            </View>

                            <FlatList
                                data={this.props.state.MatchReducer.LigueDesChampions}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                    }

                    {
                        this.props.state.MatchReducer.isActive === "Ligue1" ?
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_1.png')}/>
                                    <Text style={styles.titreLeague}>Ligue 1</Text>
                                </View>
                                
                                <FlatList
                                    data={this.props.state.MatchReducer.Ligue1}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                        :
                            null
                    }
                    
                    {   
                        this.props.state.MatchReducer.isActive === "LaLiga" ?
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    <Image style={styles.pictoLeague} source={require('../../Images/leagues/la_liga.png')}/>
                                    <Text style={styles.titreLeague}>La Liga</Text>
                                </View>
                                <FlatList
                                    data={this.props.state.MatchReducer.LaLiga}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                        :
                            null
                    }
                    
                    {
                        this.props.state.MatchReducer.isActive === "PremierLeague" ?
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    <Image style={styles.pictoLeague} source={require('../../Images/leagues/premier_league.png')}/>
                                    <Text style={styles.titreLeague}>Premier League</Text>
                                </View>

                                <FlatList
                                    data={this.props.state.MatchReducer.PremierLeague}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                        :
                            null
                    }

                    {
                        this.props.state.MatchReducer.isActive === "SerieA" ?
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    <Image style={styles.pictoLeague} source={require('../../Images/leagues/serie_a.png')}/>
                                    <Text style={styles.titreLeague}>Serie A</Text>
                                </View>

                                <FlatList
                                    data={this.props.state.MatchReducer.SerieA}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                        :
                            null
                    }

                    {
                        this.props.state.MatchReducer.isActive === "Bundesliga" ?
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    <Image style={styles.pictoLeague} source={require('../../Images/leagues/bundesliga.png')}/>
                                    <Text style={styles.titreLeague}>Bundesliga</Text>
                                </View>

                                <FlatList
                                    data={this.props.state.MatchReducer.Bundesliga}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                        :
                            null
                    }
                </ScrollView>
                { numberBets > 0 ? <MatchsSelected navigation={this.props.navigation} /> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperContent: {
        flex: 1
    },
    buttonLoad: {
        alignSelf: 'flex-end',
        padding: 16,
    },
    wrapperLeague: {
        marginBottom: 32,
    },
    wrapperLeagueHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titreLeague: {
        fontSize: 32,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16
    },
    pictoLeague: {
        width: 50,
        height: 50,
        marginRight: 8
    },
    icon: {
        width: 20,
        height: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMatchs)