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

export const Check = props => (
    <Svg viewBox="0 0 426.667 426.667" width={50} height={50} {...props}>
        <Path
        d="M213.333 0C95.518 0 0 95.514 0 213.333s95.518 213.333 213.333 213.333c117.828 0 213.333-95.514 213.333-213.333S331.157 0 213.333 0zm-39.134 322.918l-93.935-93.931 31.309-31.309 62.626 62.622 140.894-140.898 31.309 31.309-172.203 172.207z"
        data-original="#6AC259"
        className="prefix__active-path"
        data-old_color="#2BC82B"
        fill="#30D230"
        />
    </Svg>
)