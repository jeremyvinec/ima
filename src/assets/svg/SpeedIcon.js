import React from 'react'
import { Svg, G, Path } from 'react-native-svg'

export default class SpeedIcon extends React.Component {
    render(){
        return(
            <Svg width="40" height="40" viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet" version="1.1">
                <G id="Artboard" transform="matrix(1.1080508,0,0,1.1080508,-567.59958,-83.141949)" fill="#771185" style="fill-rule:evenodd;stroke:none;stroke-width:1">
                <Path d="m 539,119 c -7.73199,0 -14,-6.26801 -14,-14 0,-7.731987 6.26801,-14 14,-14 7.73199,0 14,6.268013 14,14 0,7.73199 -6.26801,14 -14,14 z m 14.06,-25.22 2.84,-2.84 C 555,89.92 554.1,89 553.08,88.12 L 550.24,91 c -3.1,-2.52 -7,-4 -11.24,-4 -9.94113,0 -18,8.058875 -18,18 0,9.94113 8.05887,18 18,18 10,0 18,-8.06 18,-18 0,-4.24 -1.48,-8.14 -3.94,-11.22 z M 537,107 h 4 V 95 h -4 z m 8,-26 h -12 v 4 h 12 z" id="speed"></Path>
                </G>
            </Svg>
        )
    }
}
    