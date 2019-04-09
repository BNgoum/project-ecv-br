import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

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

export const Home_actif = props => (
    <Svg width={26} height={24} {...props}>
      <Path
        fill="#FFF"
        fillRule="evenodd"
        stroke="#FFF"
        d="M13.74 1.259l10.869 9.317c.764.605.34 1.898-.68 1.898h-2.462v9.405c0 .603-.51 1.121-1.104 1.121h-3.736c-.594 0-1.103-.518-1.103-1.121v-5.867h-5.095v5.867c0 .603-.424 1.121-1.019 1.121H5.59c-.51 0-1.02-.518-1.02-1.121v-9.405H2.109c-1.019 0-1.529-1.293-.68-1.898L12.298 1.26a1.136 1.136 0 0 1 1.444 0z"
      />
    </Svg>
)

export const Home_inactif = props => (
    <Svg width={26} height={24} {...props}>
        <Path
        fill="none"
        fillRule="evenodd"
        stroke="#464979"
        d="M13.74 1.259l10.869 9.317c.764.605.34 1.898-.68 1.898h-2.462v9.405c0 .603-.51 1.121-1.104 1.121h-3.736c-.594 0-1.103-.518-1.103-1.121v-5.867h-5.095v5.867c0 .603-.424 1.121-1.019 1.121H5.59c-.51 0-1.02-.518-1.02-1.121v-9.405H2.109c-1.019 0-1.529-1.293-.68-1.898L12.298 1.26a1.136 1.136 0 0 1 1.444 0z"
        />
    </Svg>
)

export const Match_actif = props => (
    <Svg width={24} height={24} {...props}>
        <G fill="none" fillRule="evenodd">
        <Path
            fill="#FFF"
            stroke="#151732"
            d="M16.659 9.14l2.894-.74-2.894.74zm-1.168 3.704l1.58 2.626-1.58-2.626zm-3.266.21a.997.997 0 0 1-.95-.695l-.758-2.368a.996.996 0 0 1 .378-1.121l2.166-1.515a1 1 0 0 1 1.103-.027l2.092 1.316a1 1 0 0 1 .417 1.156l-.841 2.566a.999.999 0 0 1-.949.687h-2.658zM9.87 15.75l1.747-2.906L9.87 15.75zM7.373 8.77l3.147.604-3.147-.604zm6.224-1.593l-.224-3.218.224 3.218zm5.908.457l.772-3.6a9.192 9.192 0 0 0-3.634-2.364l-2.562 2.028c-.455.36-1.123.346-1.65-.036L9.984 1.893A9.217 9.217 0 0 0 6.53 4.478c.03.072.058.146.077.224l.784 3.35c.146.62-.16 1.315-.739 1.686L4.46 11.14a9.127 9.127 0 0 0 1.49 4.263l3.329.166c.56.028 1.007.4 1.134.943l.617 2.632a9.18 9.18 0 0 0 4.837.086l.71-3.026c.128-.548.575-.92 1.132-.949l3.435-.17c.101-.005.202.005.3.022a9.125 9.125 0 0 0 1.308-4.061L20.196 9.27c-.539-.374-.82-1.04-.69-1.637z"
        />
        <Path
            fill="#FFF"
            stroke="#151732"
            d="M15.832 12.366l.841-2.566a.998.998 0 0 0-.417-1.155l-2.092-1.316a.998.998 0 0 0-1.103.027L10.895 8.87a.996.996 0 0 0-.378 1.122l.758 2.368a.997.997 0 0 0 .95.693h2.659a.998.998 0 0 0 .948-.687zm4.446-8.332l-.772 3.6c-.129.598.15 1.263.69 1.637l2.557 1.775a9.147 9.147 0 0 0-2.475-7.012zM7.392 8.051l-.784-3.35a1.316 1.316 0 0 0-.077-.223A9.142 9.142 0 0 0 4.46 11.14l2.193-1.402c.58-.37.885-1.066.739-1.687zm1.886 7.518l-3.327-.166a9.193 9.193 0 0 0 5.08 3.741l-.617-2.632a1.204 1.204 0 0 0-1.136-.943zm8.43-.314a1.202 1.202 0 0 0-1.13.949l-.71 3.026a9.202 9.202 0 0 0 5.576-4.123 1.447 1.447 0 0 0-.299-.023l-3.437.171zM14.08 3.698l2.564-2.028a9.188 9.188 0 0 0-6.658.223l2.444 1.769c.528.382 1.196.397 1.65.036z"
        />
        <Path
            stroke="#FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.978 16.886l3.43-3.224M.5 22.98l4.007-3.803m4.123 2.102l2.612-2.456M7.184 23l-.22.237"
        />
        </G>
    </Svg>
)

export const Match_inactif = props => (
    <Svg width={23} height={24} {...props}>
        <G fill="none" fillRule="evenodd" stroke="#464979">
        <Path d="M16.541 9.19l2.787-.712-2.787.712zm-1.124 3.566l1.522 2.53-1.522-2.53zm-3.145.202a.96.96 0 0 1-.914-.668l-.73-2.28a.96.96 0 0 1 .364-1.08l2.085-1.458a.963.963 0 0 1 1.062-.026l2.014 1.267a.963.963 0 0 1 .402 1.113l-.81 2.47a.962.962 0 0 1-.913.662h-2.56zm-2.267 2.596l1.682-2.798-1.682 2.798zm-2.404-6.72l3.03.582-3.03-.582zM13.593 7.3l-.215-3.098.215 3.098zm5.689.44l.743-3.466a8.85 8.85 0 0 0-3.499-2.276l-2.467 1.953c-.438.347-1.081.333-1.589-.035l-2.354-1.703a8.874 8.874 0 0 0-3.326 2.49c.03.068.056.14.074.214l.755 3.225c.141.598-.153 1.267-.711 1.624l-2.112 1.35a8.787 8.787 0 0 0 1.435 4.104l3.205.16c.54.027.97.385 1.092.908l.594 2.534a8.838 8.838 0 0 0 4.657.083l.684-2.914a1.16 1.16 0 0 1 1.089-.913l3.308-.164c.097-.005.194.005.288.021a8.786 8.786 0 0 0 1.26-3.91l-2.461-1.709c-.519-.36-.789-1-.665-1.576z" />
        <Path d="M15.745 12.297l.81-2.471a.961.961 0 0 0-.402-1.112L14.14 7.447a.96.96 0 0 0-1.062.026L10.992 8.93a.96.96 0 0 0-.364 1.08l.73 2.28a.96.96 0 0 0 .914.667h2.56a.96.96 0 0 0 .913-.661zm4.28-8.023l-.743 3.466c-.124.576.145 1.216.665 1.576l2.461 1.71a8.807 8.807 0 0 0-2.383-6.751zM7.62 8.143l-.756-3.226a1.267 1.267 0 0 0-.074-.214 8.802 8.802 0 0 0-1.994 6.413l2.112-1.35c.558-.357.852-1.026.711-1.623zm1.815 7.237l-3.204-.16a8.85 8.85 0 0 0 4.892 3.602l-.595-2.534a1.16 1.16 0 0 0-1.093-.908zm8.117-.301a1.159 1.159 0 0 0-1.09.912l-.682 2.915a8.86 8.86 0 0 0 5.369-3.97 1.393 1.393 0 0 0-.288-.022l-3.31.165zM14.059 3.951l2.468-1.953a8.846 8.846 0 0 0-6.41.215l2.353 1.703c.509.369 1.152.383 1.589.035z" />
        <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.978 16.886l3.43-3.224M.5 22.98l4.007-3.803m4.123 2.102l2.612-2.456M7.184 23l-.22.237"
        />
        </G>
    </Svg>
)

export const New_actif = props => (
    <Svg width={24} height={24} {...props}>
        <G fill="none" fillRule="evenodd" transform="translate(1 1)">
        <Circle cx={11} cy={11} r={11} fill="#FFF" stroke="#FFF" />
        <Path
            stroke="#151732"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.351 10.703H16.65m-5.353-5.352V16.65"
        />
        </G>
    </Svg>
)

export const New_inactif = props => (
    <Svg width={24} height={24} {...props}>
        <G
        fill="none"
        fillRule="evenodd"
        stroke="#464979"
        transform="translate(1 1)"
        >
        <Circle cx={11} cy={11} r={11} />
        <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.351 10.703H16.65m-5.353-5.352V16.65"
        />
        </G>
    </Svg>
)

export const Classement_actif = props => (
    <Svg width={25} height={24} {...props}>
        <Path
        fill="#FFF"
        fillRule="evenodd"
        stroke="#FFF"
        d="M23.514 10.81l-4.633 3.803a.981.981 0 0 0-.317.956l1.39 5.739c.195.932-.489 1.692-1.293 1.692-.244 0-.487-.073-.707-.22l-5.048-3.115a.882.882 0 0 0-.975 0l-4.999 3.114a1.34 1.34 0 0 1-.731.221c-.805 0-1.537-.76-1.293-1.692l1.39-5.74c.073-.342-.025-.71-.317-.931L1.47 10.811c-.927-.81-.39-2.355.804-2.428l5.902-.417a.959.959 0 0 0 .804-.589l2.244-5.518A1.38 1.38 0 0 1 12.49 1a1.38 1.38 0 0 1 1.269.859l2.243 5.518c.122.319.44.54.804.589l5.902.417c1.22.073 1.755 1.619.805 2.428z"
        />
    </Svg>
)

export const Classement_inactif = props => (
    <Svg width={25} height={24} {...props}>
        <Path
        fill="none"
        fillRule="evenodd"
        stroke="#464979"
        d="M23.514 10.81l-4.633 3.803a.981.981 0 0 0-.317.956l1.39 5.739c.195.932-.489 1.692-1.293 1.692-.244 0-.487-.073-.707-.22l-5.048-3.115a.882.882 0 0 0-.975 0l-4.999 3.114a1.34 1.34 0 0 1-.731.221c-.805 0-1.537-.76-1.293-1.692l1.39-5.74c.073-.342-.025-.71-.317-.931L1.47 10.811c-.927-.81-.39-2.355.804-2.428l5.902-.417a.959.959 0 0 0 .804-.589l2.244-5.518A1.38 1.38 0 0 1 12.49 1a1.38 1.38 0 0 1 1.269.859l2.243 5.518c.122.319.44.54.804.589l5.902.417c1.22.073 1.755 1.619.805 2.428z"
        />
    </Svg>
)

export const Profil_actif = props => (
    <Svg width={19} height={25} {...props}>
        <Path
        d="M14.723 6.118c0 2.576-2.142 4.664-4.783 4.664-2.642 0-4.783-2.088-4.783-4.664 0-2.576 2.14-4.664 4.783-4.664 2.641 0 4.783 2.088 4.783 4.664zm-4.783 7.66c-4.584 0-9.465 4.19-8.3 8.093.603 2.02 3.716 1.866 8.3 1.866 4.583 0 7.696.154 8.299-1.866 1.165-3.903-3.716-8.093-8.3-8.093z"
        fill="#FFF"
        fillRule="evenodd"
        stroke="#FFF"
        />
    </Svg>
)

export const Profil_inactif = props => (
    <Svg width={19} height={25} {...props}>
        <Path
        d="M14.723 6.118c0 2.576-2.142 4.664-4.783 4.664-2.642 0-4.783-2.088-4.783-4.664 0-2.576 2.14-4.664 4.783-4.664 2.641 0 4.783 2.088 4.783 4.664zm-4.783 7.66c-4.584 0-9.465 4.19-8.3 8.093.603 2.02 3.716 1.866 8.3 1.866 4.583 0 7.696.154 8.299-1.866 1.165-3.903-3.716-8.093-8.3-8.093z"
        fill="none"
        fillRule="evenodd"
        stroke="#464979"
        />
    </Svg>
)
  