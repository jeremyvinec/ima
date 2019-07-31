import React from 'react'
import { Svg, G, Path } from 'react-native-svg'

export default class HygrometryIcon extends React.Component {
    render(){
        return(
            <Svg width="40" height="40" viewBox="0 0 60 60" preserveAspectRatio="xMinYMin meet" version="1.1">
              <G id="g4" transform="translate(10.5,2.5)">
                    <G id="Icônes-simples-alarmes-Copy-1" transform="translate(-35,-547)" fill="#009de3" ng-style="{'fill': $ctrl.color}">
                        <Path d="M 54.5,602 C 43.730447,602 35,593.17934 35,582.29851 35,569.16418 54.5,547 54.5,547 54.5,547 74,569.16418 74,582.29851 74,593.17934 65.269553,602 54.5,602 Z m 0,-8 C 61.403559,594 67,588.22648 67,581.10448 67,572.50746 54.5,558 54.5,558 54.5,558 42,572.50746 42,581.10448 42,588.22648 47.596441,594 54.5,594 Z" id="hygrometrie"/>
                    </G>
              </G>
            </Svg>
        )
    }
}
    