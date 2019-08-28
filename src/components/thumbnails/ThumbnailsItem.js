import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Animated,  } from 'react-native'
import Sparkline from 'react-native-sparkline'

// Accéder à Navigation Prop
import { withNavigation } from 'react-navigation'

import { connect } from 'react-redux'

// SVG
import ArrowUpIcon from '../../assets/svg/ArrowUpIcon'
import ArrowDownIcon from '../../assets/svg/ArrowDownIcon'
import CriticalBlackIcon from '../../assets/svg/CriticalBlackIcon'
import OfflineIcon from '../../assets/svg/OfflineIcon'
import RoomOutOfProdIcon from '../../assets/svg/RoomOutOfProdIcon'
import HygrometryIcon from '../../assets/svg/HygrometryIcon'
import TemperatureIcon from '../../assets/svg/TemperatureIcon'
import ConcentrationIcon from '../../assets/svg/ConcentrationIcon'
import ConductivityIcon from '../../assets/svg/ConductivityIcon'
import FlowIcon from '../../assets/svg/FlowIcon'
import ParticlesIcon from '../../assets/svg/ParticlesIcon'
import PressureIcon from '../../assets/svg/PressureIcon'
import SpeedIcon from '../../assets/svg/SpeedIcon'
import TocIcon from '../../assets/svg/TocIcon'
import TorIcon from '../../assets/svg/TorIcon'
import GenericIcon from '../../assets/svg/GenericIcon'

class ThumbnailsItem extends React.Component {
    constructor(props){
      super(props)
      this.backgroundColor = '#8ee06d',
      this.color = '#fff',
      this.fontStyle = 'normal',
      this.fontWeight = 'normal',
      this.state = {
        opacity: new Animated.Value(1),
      }
    }

    componentDidMount(){
      this._backgroundColor()
      this._color()
      this._arrow()
      this._animate()
    }

    componentDidUpdate(nextProps){
      if(nextProps.thumbnails.states != this.props.thumbnails.states){
        //console.log('Prev props | ' + nextProps.thumbnails.states)
        console.log('New props | ' + this.props.thumbnails.states)
        this._backgroundColor()
        this._color()
        this._arrow()
        this._animate()
      }
    }

    _getImageFromType(){
      type = this.props.thumbnails.type

      switch(type){
        case 'temperature': return( <TemperatureIcon/> )
        case 'hygrometry': return( <HygrometryIcon/> )
        case 'concentration': return( <ConcentrationIcon/> )
        case 'conductivity': return ( <ConductivityIcon/> )
        case 'flow': return ( <FlowIcon/> )
        case 'generic': return( <GenericIcon/> )
        case 'particles': return( <ParticlesIcon/> )
        case 'pressure': return( <PressureIcon/> )
        case 'speed': return( <SpeedIcon/> )
        case 'toc': return( <TocIcon/> )
        case 'tor': return( <TorIcon/> )
      }
    }

    _backgroundColor(){
      states = this.props.thumbnails.states
      switch(true){
        case /hs/.test(states):
            this.backgroundColor = '#fff' // $white
            break;
        case /^alarm/.test(states):
            this.backgroundColor = '#fd5d54' // $lime-red
            break;
        case /prealarm/.test(states):
            this.backgroundColor = '#fdb44b' // $pale-orange
            break;
        case /prod/.test(states):
            this.backgroundColor = '#84ef42' // $flash-green
            break;
        case /offline/.test(states):
            this.backgroundColor = '#fff' // $white
            break;
      }
    }

    _color(){
      states = this.props.thumbnails.states
      switch(true){
        case /qaa/.test(states):
            this.color = '#005dbf' //$lime-blue
            break;
        case /qai/.test(states):
            this.color = '#005dbf' //$lime-blue
            this.fontStyle = 'italic'
            break;
        case /hs/.test(states):
            this.color = '#9a9a9a' // $grey
            break;
        case /notack/.test(states):
            this.fontWeight = '700'
            break;
        case /offline/.test(states):
            this.color = '#ddd'
            break;
      }
    }

    _arrow(){
      states = this.props.thumbnails.states     
      if(states.includes('high')){
        return(
          <ArrowUpIcon/>
        )
      } else if(states.includes('low')){
        return(
          <ArrowDownIcon/>
        )
      }
    }

    _critical(){
      const critical = this.props.thumbnails.critical
      if(critical === true){
        return(
          <CriticalBlackIcon/>
        )
      } return null
    }

    _offline(){
      states = this.props.thumbnails.states
      if(states.includes('offline')){
        return(
          <OfflineIcon/>
        )
      } return null
    }

    _roomoutofprod(){
      states = this.props.thumbnails.states
      if(states.includes('roomoutofprod')){
        return(
          <RoomOutOfProdIcon/>
        )
      } return null
    }

    _animate(){
      states = this.props.thumbnails.states
      if(states.includes('notack')){
        Animated.loop(
          Animated.sequence([
            Animated.timing(this.state.opacity, {
                duration: 1500,
                toValue: 0.4,
            }),
            Animated.timing(this.state.opacity, {
                duration: 1500,
                toValue: 1.0,
            })
          ]),
          {
            iteration: 4
          }
        ).start();
      }
    }

    render() {
      const { thumbnails, displayRelease, navigation } = this.props
      const data = Array.from({ length: 20 }).map(
        (unused, i) => i + (i + 1) * Math.random()
      )
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Release') + displayRelease(thumbnails.name)} >
          <Animated.View style={[{backgroundColor: this.backgroundColor, opacity: this.state.opacity},styles.button, styles.main_container]}>
            {this._getImageFromType()}
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={[{color: this.color, fontStyle: this.fontStyle, fontWeight: this.fontWeight},styles.title_text]}>{thumbnails.name}</Text>
                {this._critical()}
              </View>
              <View style={styles.value_container}>
                <Text style={styles.textButton}>{thumbnails.value}{' '}{thumbnails.unit}</Text>
                <View style={{marginTop: 20}}>
                  {this._arrow()}
                  {this._offline()}
                  {this._roomoutofprod()}
                </View>
              </View>
              <View style={{flex:1}}>
                <Sparkline width='150' height='50' data={data} style={styles.sparkline}>
                  <Sparkline.Line/>
                  <Sparkline.Spots color='#fd5d54'/>
                </Sparkline>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    main_container: {
      flexDirection: 'row',
    },
    content_container: {
      flex: 1,
    },
    header_container: {
      flexDirection: 'row',
      marginTop: 1,
      justifyContent: 'space-between'
    },
    value_container: {
      flexDirection: 'row',
      marginTop: 1,
      justifyContent: 'space-between'
    },
    button: {
      margin: 5,
      padding: 5,
      width: 250,
      height: 100,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title_text: {
      fontSize: 14,
      marginTop: 5,
    },
    textButton:{
      fontSize: 17,
      fontWeight: '700',
    },
    swipe: {
      flexDirection: 'row', 
      alignItems: 'center',
      top: '50%'
    },
    sparkline: {
      position: 'absolute', 
      bottom: 0
    }
  });

  export default withNavigation(ThumbnailsItem)