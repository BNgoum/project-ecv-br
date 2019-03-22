import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Match from './Match';
import TabButtons from './TabButtons';
import {requestMatchs} from '../../Store/Reducers/Match/action'

import MatchsSelected from '../../Components/BetRoom/MatchsSelected';

import PaginationPoints from '../Style/PaginationPoints';
import TextBold from '../Style/TextBold';

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
            liguedesChampions: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getMatchs();
    }

    getMatchs = () => {
        const championnats = ["Serie A", "Primera Division", "Ligue 1", "Bundesliga", "UEFA Champions League", "Premier League"];

        championnats.map(championnat => {
            return new Promise ((resolve, reject) => {
                resolve(requestMatchs(championnat));
            })
            .then( action => {
                let matchScheduled = [];

                action.value.map(match => {
                    if (match.statut === "SCHEDULED" || match.statut === "IN_PLAY" || match.statut === "LIVE") {
                        matchScheduled.push(match)
                    }
                })

                matchScheduled.sort(function(a,b){
                    return new Date(a.dateHeureMatch) - new Date(b.dateHeureMatch);
                });

                action.value = matchScheduled;

                this.props.dispatch(action);
            })
            .catch(error => console.log('Erreur lors de la promise requestMatchs : ', error))
        })
    }

    render() {
        const numberBets = this.props.state.BetRoomReducer.numberBets;
        return (
            <View style={styles.container}>
                <View>
                    <TabButtons />
                </View>
                <ScrollView style={styles.wrapperContent}>

                    { this.props.state.MatchReducer.isActive === "LDC" && 
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_des_champions.png')}/> */}
                                <TextBold style={styles.titreLeague}>Ligue des Champions</TextBold>
                            </View>

                            <FlatList
                                data={this.state.liguedesChampions}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    }

                    {
                        this.props.state.MatchReducer.isActive === "Ligue1" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/ligue_1.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Ligue 1</TextBold>
                                </View>
                                
                                <FlatList
                                    data={this.props.state.MatchReducer.Ligue1}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                    }
                    
                    {   
                        this.props.state.MatchReducer.isActive === "LaLiga" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/la_liga.png')}/> */}
                                    <TextBold style={styles.titreLeague}>La Liga</TextBold>
                                </View>
                                <FlatList
                                    data={this.props.state.MatchReducer.LaLiga}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                    }
                    
                    {
                        this.props.state.MatchReducer.isActive === "PremierLeague" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/premier_league.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Premier League</TextBold>
                                </View>

                                <FlatList
                                    data={this.props.state.MatchReducer.PremierLeague}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                    }

                    {
                        this.props.state.MatchReducer.isActive === "SerieA" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/serie_a.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Serie A</TextBold>
                                </View>

                                <FlatList
                                    data={this.props.state.MatchReducer.SerieA}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                    }

                    {
                        this.props.state.MatchReducer.isActive === "Bundesliga" &&
                            <View style={styles.wrapperLeague}>
                                <View style={styles.wrapperLeagueHeader}>
                                    {/* <Image style={styles.pictoLeague} source={require('../../Images/leagues/bundesliga.png')}/> */}
                                    <TextBold style={styles.titreLeague}>Bundesliga</TextBold>
                                </View>

                                <FlatList
                                    data={this.props.state.MatchReducer.Bundesliga}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({item}) => <Match matchs={item} />}
                                />
                            </View>
                    }
                </ScrollView>
                
                { numberBets > 0 && <MatchsSelected navigation={this.props.navigation} /> }

                <PaginationPoints isActive={4} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16
    },
    wrapperContent: {
        marginBottom: 16
    },
    buttonLoad: {
        alignSelf: 'flex-end',
        padding: 16,
    },
    wrapperLeague: {
        marginTop: 16,
    },
    wrapperLeagueHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titreLeague: {
        fontSize: 22,
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
    },
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