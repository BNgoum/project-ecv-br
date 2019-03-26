import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';

import { connect } from 'react-redux';

import ButtonPrimary from '../../Components/Style/ButtonPrimary';
import ButtonPrimaryText from '../../Components/Style/ButtonPrimaryText';
import InputText from '../../Components/Form/InputText';
import TextBold from '../../Components/Style/TextBold';
import StepNumber from '../../Components/Style/StepNumber';
import StepNumberContainer from '../../Components/Style/StepNumberContainer';
import PaginationPoints from '../../Components/Style/PaginationPoints';

class NewBetRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isSplashScreen: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isSplashScreen: false})
        }, 2000);
    }

    handleOnPress = (name) => {
        const action = { type: "SET_NAME", value: name }
        this.props.dispatch(action);

        this.props.navigation.navigate('Rewards');
    }

    displaySplashScreen = () => {
        return <View style={ styles.containerSplashScreen }>
            <View style={ styles.backgroundSplashScreen }></View>
            <TextBold style={ styles.titleSplashScreen }>C'est parti pour créer{"\n"}une nouvelle Bet Room</TextBold>
        </View>
    }

    handleOnChangeText = (type, value) => {
        this.setState({ name: value })
    }
    
    render() {
        return (
            this.state.isSplashScreen ?
            this.displaySplashScreen() :
            <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']}>
                <View style={styles.container}>
                        <View>
                            <StepNumberContainer><StepNumber>1</StepNumber></StepNumberContainer>
                            <TextBold style={ styles.title }>Donne lui un nom</TextBold>
                        </View>
                        
                        <View>
                            <InputText 
                                placeholder="Nom de ma Bet Room"
                                sendPropsToParent={ this.handleOnChangeText }
                                typeOfInput="email"
                                style={ styles.inputTextStyle }
                            />

                            <ButtonPrimary onPress={ () => this.handleOnPress(this.state.name) } style={styles.buttonValidate}>
                                <ButtonPrimaryText>Suivant</ButtonPrimaryText>
                            </ButtonPrimary>
                        </View>
                        
                        <PaginationPoints isActive={1} />
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    containerSplashScreen: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        position: 'relative',
        padding: 40,
        display: 'flex',
        justifyContent: 'space-between',
    },
    backgroundSplashScreen: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -100}, { translateY: -100}],
        borderRadius: 100,
        width: 200,
        height: 200,
        backgroundColor: '#282a4e',
    },
    titleSplashScreen: {
        fontSize: 23,
        textAlign: 'center'
    },
    buttonValidate: {
        width: 156,
        alignSelf: 'center'
    },
    title: {
        fontSize: 18,
        marginTop: 4,
        textAlign: 'center'
    },
    inputTextStyle: {
        width: '100%'
    },
    paginationStyle: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -50
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

export default connect(mapStateToProps, mapDispatchToProps)(NewBetRoom)