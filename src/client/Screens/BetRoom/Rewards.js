import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';

import ButtonPrimary from '../../Components/Style/ButtonPrimary';
import ButtonPrimaryText from '../../Components/Style/ButtonPrimaryText';
import RewardsComponent from '../../Components/BetRoom/Rewards';
import PaginationPoints from '../../Components/Style/PaginationPoints';

class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <RewardsComponent />

                <ButtonPrimary onPress={ () => this.props.navigation.navigate('Friends') } style={styles.buttonValidate}>
                    <ButtonPrimaryText>Suivant</ButtonPrimaryText>
                </ButtonPrimary>

                <PaginationPoints style={ styles.paginationStyle } isActive={2} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonValidate: {
        width: 156,
        alignSelf: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)