import React, { Component } from 'react';

import BetRoomDetailsComponent from '../../Components/BetRoom/BetRoomDetails';
import { LinearGradient } from 'expo';

export default class BetRoomDetails extends Component {
    render() {
        return (
            <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']}>
                <BetRoomDetailsComponent />
            </LinearGradient>
        )
    }
}