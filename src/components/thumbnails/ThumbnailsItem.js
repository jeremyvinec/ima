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
import TorIcon from '../../assets/svg/TorIcon'

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
      this.localStockage = null,
      this.state = {
        opacity: new Animated.Value(1),
      }
    }

    componentDidMount(){
      this._backgroundColor()
      this._iconNotif()
      this._color()
      this._arrow()
      this._animate()
      this._localStockage()
    }
    

    componentDidUpdate(nextProps){
      if(nextProps.thumbnails.id != this.props.thumbnails.id){
        console.log('new id')
        this._configure()
      } else if(nextProps.thumbnails.states != this.props.thumbnails.states){
        console.log('new states')
        //console.log('Prev props | ' + nextProps.thumbnails.states)
        //console.log('New props | ' + this.props.thumbnails.states)
        this._configure() // Notification
        this._backgroundColor()
        this._color()
        this._arrow()
        this._animate()
      } else if(nextProps.thumbnails.type != this.props.thumbnails.type){
        console.log('new type')
      }
    }

    _iconNotif(){
      type = this.props.thumbnails.type

      switch(type){
        case 'temperature': return this.iconNotif = 'ic_temperature'
        case 'hygrometry': return this.iconNotif = 'ic_hygrometry'
        case 'concentration': return this.iconNotif = 'ic_concentration'
        case 'conductivity': return this.iconNotif = 'ic_conductivity'
        case 'flow': return this.iconNotif = 'ic_flow'
        case 'generic': return this.iconNotif = 'ic_generic'
        case 'particles': return this.iconNotif = 'ic_particles'
        case 'pressure': return this.iconNotif = 'ic_pressure'
        case 'speed': return this.iconNotif = 'ic_speed'
        case 'toc': return this.iconNotif = 'ic_toc'
        case 'tor': return this.iconNotif = 'ic_tor'
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
        case 'generic': // generic
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

    _configure() {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token){
          //console.log(token)
        }, //this._onRegister.bind(this),
  
        // (required) Called when a remote or local notification is opened or received
        onNotification: this._onNotification(), //this._onNotification,
  
        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: '218075749940',
  
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
  
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
  
        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
      });
    }

    _onNotification() {
      console.log('notification')
      thumbnails = this.props.thumbnails
      states = this.props.thumbnails.states
      this.lastId++;

      switch(true){
        case /^alarm/.test(states):
            PushNotification.localNotification({
              /* iOS and Android properties */
              title: this.alarmeType + thumbnails.name, // (optional)
              message: thumbnails.type + ' : ' + thumbnails.value + ' ' + thumbnails.unit, // (required)
              largeIcon: this.iconNotif, // (optional) default: "ic_launcher"
              smallIcon: this.arrow, // (optional) default: "ic_notification" with fallback for "ic_launcher"
              subText: this.localStockage + ' : ' + thumbnails.states, // (optional) default: none
              color: "red", // (optional) default: system default
              group:'alarm',
              importance: 'high'
            })
            break;
        case /prealarm/.test(states):
            PushNotification.localNotification({
              /* iOS and Android properties */
              title: this.alarmeType + thumbnails.name, // (optional)
              message: thumbnails.type + ' : ' + thumbnails.value + ' ' + thumbnails.unit, // (required)
              largeIcon: this.iconNotif, // (optional) default: "ic_launcher"
              smallIcon: this.arrow, // (optional) default: "ic_notification" with fallback for "ic_launcher"
              subText: this.localStockage + ' : ' + thumbnails.states, // (optional) default: none
              color: "#fc990b", // (optional) default: system default
              group:'prealarm',
              importance: 'high'
            })
            break;
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