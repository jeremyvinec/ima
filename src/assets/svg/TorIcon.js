import React from 'react'
import { Svg, G, Text, TSpan, Circle } from 'react-native-svg'

export default class TorIcon extends React.Component {
    render(){
        return(
            <Svg width="40" height="40" viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet" version="1.1">
                <G id="g15" fill="none" transform="translate(4.5,4.5)">
                    <G id="Etats" transform="translate(-26,-987)">
                    <G id="TOR-Copy" transform="translate(26,987)">
                        <G id="Group" transform="translate(10,5)" fontSize="24" fontWeight="bold" fill="#c30d2c">
                        <Text id="0-copy" letterSpacing="-0.45">
                            <TSpan x="0" y="22" id="tspan2">0</TSpan>
                        </Text>
                        <Text id="/-copy" letterSpacing="-0.45">
                            <TSpan x="12" y="27" id="tspan5">/</TSpan>
                        </Text>
                        <Text id="1-copy">
                            <TSpan x="18" y="34" id="tspan8">1</TSpan>
                        </Text>
                        </G>
                        <Circle id="Oval-2" cx="25.5" cy="25.5" r="23.5" stroke="#c30d2c" strokeWidth="4"></Circle>
                    </G>
                    </G>
                </G>
            </Svg>
        )
    }
}
    