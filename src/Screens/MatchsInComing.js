import React, { Component } from 'react';
import ListMatchsInComing from '../Components/Match/ListMatchsInComing';
import { LinearGradient } from 'expo';

export default class MatchsInComing extends Component {
    render() { return ( 
        <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']} >
            <ListMatchsInComing />
        </LinearGradient> ) }
}