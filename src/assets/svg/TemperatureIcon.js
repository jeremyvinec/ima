import React from 'react'
import { Svg, G, Path } from 'react-native-svg'

export default class TemperatureIcon extends React.Component {
    render(){
        return(
            <Svg width="40" height="40" viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet" version="1.1">
                <G id="g7" transform="translate(9)">
                    <G id="Icônes-simples-alarmes-Copy-3" transform="translate(-362,-107)" fill="#fff9a8" ng-style="{'fill': $ctrl.color }">
                        <Path d="m 391.90152,132 v -6.25 H 404 V 132 Z m 0,10 v -6.25 H 404 V 142 Z m 0,-20 v -6.25 H 404 V 122 Z m 0.39531,30 c 0,8.28427 -6.78217,15 -15.14841,15 C 368.78218,167 362,160.28427 362,152 c 0,-4.92 2.39345,-9.27 6.05937,-12 v -24 c 0,-4.97056 4.0693,-9 9.08905,-9 5.01974,0 9.08905,4.02944 9.08905,9 v 24 c 3.66592,2.73 6.05936,7.08 6.05936,12 z m -18.1781,-27 v 18.51 c -3.54473,1.23 -6.05936,4.56 -6.05936,8.49 0,4.97056 4.0693,9 9.08905,9 5.01974,0 9.08905,-4.02944 9.08905,-9 0,-3.93 -2.51464,-7.26 -6.05937,-8.49 V 125 Z" id="temperature"/>
                    </G>
                </G>
            </Svg>
        )
    }
}
    