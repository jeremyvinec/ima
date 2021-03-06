import React from 'react'
import { Svg, G, Path } from 'react-native-svg'

export default class PressureIcon extends React.Component {
    render(){
        return(
            <Svg width="40" height="40" viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet" version="1.1">
                <G id="g5" transform="translate(5,8.0000022)">
                    <G id="Icônes-simples-alarmes-Copy-2" transform="translate(-357,-443)" fill="#a358c4" ng-style="{'fill': $ctrl.color }">
                        <Path d="M 381.49331,476 C 377.35487,476 374,472.65111 374,468.52004 c 0,-2.79252 1.52364,-5.23598 3.74665,-6.50757 L 402,448 388.18733,471.88602 C 386.93845,474.32947 384.4157,476 381.49331,476 Z m 0.22279,-33 c 4.47361,0 8.65063,1.23892 12.2839,3.27076 l -5.19038,2.9982 c -2.1503,-0.84247 -4.62191,-1.31326 -7.09352,-1.31326 -10.92026,0 -19.77288,8.87496 -19.77288,19.82279 0,5.47604 2.19973,10.43174 5.78357,13.99985 h 0.0247 c 0.96393,0.96636 0.96393,2.5274 0,3.49376 -0.96393,0.96636 -2.54576,0.96636 -3.50968,0.0248 C 359.7682,480.81197 357,474.61735 357,467.77849 357,454.09371 368.06577,443 381.7161,443 Z M 407,468.54678 c 0,6.92583 -2.90124,13.19922 -7.58985,17.74116 -1.01026,0.95355 -2.64221,0.95355 -3.65246,-0.0251 -1.01025,-0.97865 -1.01025,-2.55955 0,-3.5382 3.75607,-3.63856 6.06152,-8.63219 6.06152,-14.17787 0,-2.50935 -0.49217,-5.01871 -1.39881,-7.27713 L 403.55478,456 C 405.7048,459.76404 407,463.97975 407,468.54678 Z" id="pression"/>
                    </G>
                </G>
            </Svg>
        )
    }
}
    