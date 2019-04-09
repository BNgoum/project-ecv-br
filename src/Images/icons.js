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

export const Participant_small = props => (
    <Svg width={11} height={12} {...props}>
        <Path
        fill="#f1f1f1"
        d="M3.488 6.933h4.024c.522 0 1.227.212 1.765.621.538.41.918.981.918 1.78V11.2H.805V9.333c0-.798.38-1.37.918-1.779.538-.409 1.243-.62 1.765-.62zm0-.8c-.725 0-1.563.257-2.255.784C.54 7.443 0 8.273 0 9.333V11.6c0 .22.18.4.402.4h10.196c.222 0 .402-.18.402-.4V9.333c0-1.06-.54-1.89-1.232-2.416-.693-.527-1.53-.784-2.256-.784H3.488zM5.5.8a2 2 0 1 1 0 4 2 2 0 1 1 0-4zm0-.8C3.949 0 2.683 1.258 2.683 2.8c0 1.542 1.266 2.8 2.817 2.8 1.551 0 2.817-1.258 2.817-2.8C8.317 1.258 7.051 0 5.5 0z"
        fillRule="evenodd"
        />
    </Svg>
)