import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated,  } from 'react-native'
import PushNotification from 'react-native-push-notification'

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

class ThumbnailsItem extends React.Component {
    constructor(props){
      super(props)
      this.backgroundColor = '#8ee06d',
      this.color = '#fff',
      this.fontStyle = 'normal',
      this.fontWeight = 'normal',
      this.arrow = 'ic_stat_icon_ivtracer',
      this.iconNotif = '',
      this.alarmeType = ''
      this.localStockage = null
      this.state = {
        opacity: new Animated.Value(1)
      }
      this.states = this.props.thumbnails.states
    }

    componentWillMount(){
      this._backgroundColor()
      this._color()
      this._arrow()
      this._animate()
      this._localStockage()
      //this._localNotif()
    }

    componentDidUpdate(nextProps){
      if(nextProps.thumbnails.id != this.props.thumbnails.id){
        console.log('new id')
        this._localNotif()
      } else if(nextProps.thumbnails.states != this.props.thumbnails.states){
        console.log('new states')
        //console.log('Prev props | ' + nextProps.thumbnails.states)
        //console.log('New props | ' + this.props.thumbnails.states)
        this._localNotif()
      }
    }

    _getImageFromType(){
      const type = this.props.thumbnails.type
      //console.log(type)
      switch(type){
        case 'temperature':
            return( <TemperatureIcon/> )
            this.iconNotif = 'ic_temperature'
            break;
        case 'hygrometry':
            return( <HygrometryIcon/> )
            this.iconNotif = 'ic_hygrometry'
            break;
        case 'concentration':
            return( <ConcentrationIcon/> )
            this.iconNotif = 'ic_concentration'
            break;
        case 'conductivity':
            return ( <ConductivityIcon/> )
            this.iconNotif = 'ic_conductivity'
            break;
        case 'flow':
            return ( <FlowIcon/> )
            this.iconNotif = 'ic_flow'
            break;
        case 'generic':
            // generic
            this.iconNotif = 'ic_generic'
            break;
        case 'particles':
            return( <ParticlesIcon/> )
            this.iconNotif = 'ic_particles'
            break;
        case 'pressure':
            return( <PressureIcon/> )
            this.iconNotif = 'ic_pressure'
            break;
        case 'speed':
            return( <SpeedIcon/> )
            this.iconNotif = 'ic_speed'
            break;
        case 'toc':
            return( <TocIcon/> )
            this.iconNotif = 'ic_toc'
            break;
        case 'tor':
            //tor
            this.iconNotif = 'ic_tor'
            break;
      }
    }

    _backgroundColor(){
      states = this.states

      if(states.includes('hs')){
        this.backgroundColor = '#fff' // $white
      } else if(states.includes('alarm')){
        this.backgroundColor = '#fd5d54' // $lime-red
      } else if(states.includes('prealarm')){
        this.backgroundColor = '#fdb44b' // $pale-orange
      } else if(states.includes('prod')){
        this.backgroundColor = '#84ef42' // $flash-green
      } else if(states.includes('offline')){
        this.backgroundColor = '#fff' // $White
      }
    }

    _color(){
      states = this.states
      if(states.includes('qaa')){
        this.color = '#005dbf' //$lime-blue
      } else if(states.includes('qai')){
        this.color = '#005dbf' //$lime-blue
      } else if(states.includes('qai')){
        this.color = '#005dbf', //$lime-blue
        this.fontStyle = 'italic'
      } else if(states.includes('hs')){
        this.color = '#9a9a9a' // $grey
      } else if(states.includes('notack')){
        this.fontWeight = '700'
      } else if(states.includes('offline')){
        this.color = '#ddd'
      }
    }

    _arrow(){
      states = this.states       
      if(states.includes('high')){
        this.arrow = 'ic_arrowup'
        this.alarmeType = 'Alarme haute : '
        return(
          <ArrowUpIcon/>
        )
      } else if(states.includes('low')){
        this.arrow = 'ic_arrowdown'
        this.alarmeType = 'Alarme basse : '
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
      } else {

      }
    }

    _offline(){
      states = this.states
      if(states.includes('offline')){
        return(
          <OfflineIcon/>
        )
      }
    }

    _roomoutofprod(){
      states = this.states
      if(states.includes('roomoutofprod')){
        return(
          <RoomOutOfProdIcon/>
        )
      }
    }

    _animate(){
      states = this.states
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

    _localNotif() {
      console.log('notification')
      thumbnails = this.props.thumbnails
      this.lastId++;

      if(this.props.thumbnails.states.includes('alarm')){
        PushNotification.localNotification({
          /* iOS and Android properties */
          title: this.alarmeType + thumbnails.name, // (optional)
          message: thumbnails.type + ' : ' + thumbnails.value + ' ' + thumbnails.unit, // (required)
          largeIcon: this.iconNotif, // (optional) default: "ic_launcher"
          smallIcon: this.arrow, // (optional) default: "ic_notification" with fallback for "ic_launcher"
          subText: this.localStockage + ' : ' + thumbnails.states, // (optional) default: none
          color: "red", // (optional) default: system default
          group:'alarm'
        })
      } 
      else if(this.props.thumbnails.states.includes('prealarm')){
        PushNotification.localNotification({
          /* iOS and Android properties */
          title: this.alarmeType + thumbnails.name, // (optional)
          message: thumbnails.type + ' : ' + thumbnails.value + ' ' + thumbnails.unit, // (required)
          largeIcon: this.iconNotif, // (optional) default: "ic_launcher"
          smallIcon: this.arrow, // (optional) default: "ic_notification" with fallback for "ic_launcher"
          subText: this.localStockage + ' : ' + thumbnails.states, // (optional) default: none
          color: "orange", // (optional) default: system default
          group:'prealarm'
        })
      }

      // Clique sur la notification
      const { navigation, displayRelease } = this.props
      PushNotification.configure({
        onNotification: function(notification){
          //console.log(notification.userInteraction)
          const clicked = notification.userInteraction
          if(clicked){
            navigation.navigate('Release') + displayRelease(thumbnails.name)
          }
        }
      })

    }

    _localStockage(){
      const id = this.props.thumbnails.id
      const regex = /[.]/gi;
      const replace = id.replace(regex, ' ')
      const string = replace.split(' ')
      this.localStockage = string[5]
    }

    render() {
      const { thumbnails, displayRelease, navigation } = this.props
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
                {this._arrow()}
                {this._offline()}
                {this._roomoutofprod()}
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    main_container: {
      height: 90,
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
      width: 200,
      height: 90,
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
    }
  });

  const mapStateToProps = (state) => {
    return {
      //thumbnailsItem: state.thumbnailsItem
    }
  }

  export default connect(mapStateToProps)(withNavigation(ThumbnailsItem))