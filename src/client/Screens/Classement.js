import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { requestUserInformationById } from '../Store/Reducers/User/action';

import ItemClassement from '../Components/Classement/ItemClassement';

import TextBold from '../Components/Style/TextBold';
import TextRegular from '../Components/Style/TextRegular';

class Classement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        const user = this.props.state.AuthenticationReducer.userInfo;

        return new Promise((resolve, reject) => {
            resolve(this.setFriends())
        })
        .then( () => {
            let currentUser = { "pseudo": user.pseudo, "totalPoints": user.totalPoints };
            this.setState(prevState => ({
                friends: [...prevState.friends, currentUser]
            }))
        })
        .then(() => {
            let arraySort = this.state.friends.sort((friendA, friendB) => {
                return friendA.totalPoints > friendB.totalPoints
            })
            arraySort.reverse();

            arraySort.map((user, index) => {
                user.rang = index + 1
            })

            this.setState({ friends: arraySort });
        })
        .catch(error => console.log('Erreur dans le componentDidMount des amis (classement.js) : ', error))
    }

    setFriends = () => {
        const user = this.props.state.AuthenticationReducer.userInfo;
        this.setState({ friends: [] });

        let promiseAllFriends = user.friends.accepted.map(friend => {
            return new Promise((resolve, reject) => {
                // On récupère les données de l'ami
                resolve(requestUserInformationById(friend))
            })
            .then( friendData => {
                // On crée un objet pour l'ami courant
                let friendInfo = { "pseudo": friendData.pseudo, "totalPoints": friendData.totalPoints }
                // Et on l'ajoute dans le state
                this.setState(prevState => ({
                    friends: [...prevState.friends, friendInfo]
                }))
            })
            .catch(error => console.log('Erreur dans le foreach des amis (classement.js) : ', error))
        });   

        return Promise.all(promiseAllFriends)
    }
    
    render() {
        console.log('Array friends : ', this.state.friends)
        return (
            <View style={ styles.container }>
                <TextBold style={ styles.title }>Classement</TextBold>
                {
                    this.state.friends.length > 0 &&
                    <FlatList
                        data={ this.state.friends }
                        keyExtractor={ (item) => item.pseudo }
                        renderItem={ ({item}) => 
                            <ItemClassement data={item} />
                        }
                    />
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20
    },
    wrapperContent: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 16,
        margin: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 20
    }
})

const mapStateToProps = state => { 
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classement)