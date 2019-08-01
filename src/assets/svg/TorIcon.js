import React from 'react'
import { Svg, G, Text, Tspan, Circle } from 'react-native-svg'

export default class TocIcon extends React.Component {
    render(){
        return(
            <Svg width="60" height="60" viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet" version="1.1">
                <G id="g15" fill="none" transform="translate(4.5,4.5)">
                    <G id="Etats" transform="translate(-26,-987)">
                    <G id="TOR-Copy" transform="translate(26,987)">
                        <G id="Group" transform="translate(10,5)" font-size="24" font-weight="bold" fill="#c30d2c" style="font-weight:bold;font-size:24px;font-family:Roboto-Bold, Roboto;" ng-style="{'fill': $ctrl.color }">
                        <Text id="0-copy" letter-spacing="-0.45" style="letter-spacing:-0.44999999">
                            <Tspan x="0" y="22" id="tspan2">0</Tspan>
                        </Text>
                        <Text id="/-copy" letter-spacing="-0.45" style="letter-spacing:-0.44999999">
                            <Tspan x="12" y="27" id="tspan5">/</Tspan>
                        </Text>
                        <Text id="1-copy">
                            <Tspan x="18" y="34" id="tspan8">1</Tspan>
                        </Text>
                        </G>
                        <Circle id="Oval-2" cx="25.5" cy="25.5" r="23.5" stroke="#c30d2c" stroke-width="4" ng-style="{'stroke': $ctrl.color }"></Circle>
                    </G>
                    </G>
                </G>
            </Svg>
        )
    }
}
    