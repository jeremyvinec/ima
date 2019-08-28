import React from 'react'
import { Svg, Path } from 'react-native-svg'

export default class GenericIcon extends React.Component {
    render(){
        return(
            <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <Path d="M29 40.5L68.5 1L79 11.5L39.5 51L37.5 49L7.5 79L1 72.5L31 42.5L29 40.5Z" fill="black" stroke="black"/>
            </Svg>
        )
    }
}
    