import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Arrow = props => (
    <Svg width={8} height={14} {...props}>
        <Path
            fill="none"
            fillRule="evenodd"
            stroke="#FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M0 1l7.825 6.14L0 13.52"
        />
    </Svg>
)