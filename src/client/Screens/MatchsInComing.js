import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';

import Match from '../Components/Match';
import { getMatchsDuJour } from '../../server/API/FootballAPI';

export default class MatchsInComing extends Component {
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
        this.loadMatchs();
    }

    fetchMatchs = () => {
        fetch('http://192.168.1.81:3000/api/fetchMatchDeLaSemaine')
        .catch((error) => console.error(error));
    }

    loadMatchs = () => {
        
        fetch('http://192.168.1.81:3000/api/matchdelasemaine?championnat=Ligue 1')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                Ligue1: responseJson.matchs,
            })
        })
        .catch((error) => console.error(error));

        fetch('http://192.168.1.81:3000/api/matchdelasemaine?championnat=La Liga')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                LaLiga: responseJson.matchs,
            })
        })
        .catch((error) => console.error(error));

        fetch('http://192.168.1.81:3000/api/matchdelasemaine?championnat=Premier League')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                PremierLeague: responseJson.matchs,
            })
        })
        .catch((error) => console.error(error));

        fetch('http://192.168.1.81:3000/api/matchdelasemaine?championnat=Bundesliga')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                Bundesliga: responseJson.matchs,
            })
        })
        .catch((error) => console.error(error));

        fetch('http://192.168.1.81:3000/api/matchdelasemaine?championnat=Serie A')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                SerieA: responseJson.matchs,
            })
        })
        .catch((error) => console.error(error));

        fetch('http://192.168.1.81:3000/api/matchdelasemaine?championnat=Ligue des champions')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                LiguedesChampions: responseJson.matchs,
            })
        })
        .catch((error) => console.error(error));

    // displayMatchByLeague = () => {
    //     let matchsSortByLeague = {
    //         "Ligue 1": [],
    //         "Premier League": [],
    //         "Bundesliga": [],
    //         "Serie A": [],
    //         "La Liga": [],
    //         "Ligue des Champions": []
    //     };

    //     // On tri chaque matchs en les classant par championnat dans des arrays
    //     this.state.matchs.forEach( function(match) {
    //         switch (match.championnat) {
    //             case 'Ligue 1':
    //                 matchsSortByLeague[Object.keys(matchsSortByLeague)[0]].push(match);
    //                 break;
    //             case 'Premier League':
    //                 matchsSortByLeague[Object.keys(matchsSortByLeague)[1]].push(match);
    //                 break;
    //             case 'Bundesliga':
    //                 matchsSortByLeague[Object.keys(matchsSortByLeague)[2]].push(match);
    //                 break;
    //             case 'Serie A':
    //                 matchsSortByLeague[Object.keys(matchsSortByLeague)[3]].push(match);
    //                 break;
    //             case 'La Liga':
    //                 matchsSortByLeague[Object.keys(matchsSortByLeague)[4]].push(match);
    //                 break;
    //             case 'Ligue des champions':
    //                 matchsSortByLeague[Object.keys(matchsSortByLeague)[5]].push(match);
    //                 break;
    //         }
    //     })

        // On récupère chaque championnat et on les ajoute dans une flatlist
        // let arrayflatlists = [];
        // const flatlistcomponent = "";
        // for (const league in matchsSortByLeague) {
        //     if (matchsSortByLeague.hasOwnProperty(league)) {
        //         const element = matchsSortByLeague[league];
        //         this.displayFlatList(element);
        //     }
        // }

        // this.setState({
        //     matchsSortByLeague: matchsSortByLeague
        // })
    }


    
    render() {
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={this.loadMatchs}
                    style={styles.buttonLoad}>
                    <Image style={styles.icon} source={require('../Images/refresh.png')}/>
                </TouchableOpacity>

                {
                    this.state.Ligue1.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../Images/leagues/ligue_1.png')}/>
                                <Text style={styles.titreLeague}>Ligue 1</Text>
                            </View>
                            
                            <FlatList
                                data={this.state.Ligue1}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }
                
                {   
                    this.state.LaLiga.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../Images/leagues/la_liga.png')}/>
                                <Text style={styles.titreLeague}>La Liga</Text>
                            </View>
                            <FlatList
                                data={this.state.LaLiga}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }
                
                {
                    this.state.PremierLeague.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../Images/leagues/premier_league.png')}/>
                                <Text style={styles.titreLeague}>Premier League</Text>
                            </View>

                            <FlatList
                                data={this.state.PremierLeague}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }

                {
                    this.state.SerieA.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../Images/leagues/serie_a.png')}/>
                                <Text style={styles.titreLeague}>Serie A</Text>
                            </View>

                            <FlatList
                                data={this.state.SerieA}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }

                {
                    this.state.Bundesliga.length > 0 ?
                        <View style={styles.wrapperLeague}>
                            <View style={styles.wrapperLeagueHeader}>
                                <Image style={styles.pictoLeague} source={require('../Images/leagues/bundesliga.png')}/>
                                <Text style={styles.titreLeague}>Bundesliga</Text>
                            </View>

                            <FlatList
                                data={this.state.Bundesliga}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({item}) => <Match matchs={item} />}
                            />
                        </View>
                    :
                        null
                }

                { this.state.LiguedesChampions.length > 0 ? 
                    <View style={styles.wrapperLeague}>
                        <View style={styles.wrapperLeagueHeader}>
                            <Image style={styles.pictoLeague} source={require('../Images/leagues/ligue_des_champions.png')}/>
                            <Text style={styles.titreLeague}>Ligue des Champions</Text>
                        </View>

                        <FlatList
                            data={this.state.LiguedesChampions}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({item}) => <Match matchs={item} />}
                        />
                    </View>
                :
                    null
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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