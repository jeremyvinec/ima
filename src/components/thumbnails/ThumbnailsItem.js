import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import PushNotification from 'react-native-push-notification';

// ICONS
import temperature from '../../assets/images/types/temperature.png'
import hygrometry from '../../assets/images/types/hygrometry.png'
import concentration from '../../assets/images/types/concentration.png'
import conductivity from '../../assets/images/types/conductivity.png'
import flow from '../../assets/images/types/flow.png'
import generic from '../../assets/images/types/generic.png'
import particle from '../../assets/images/types/particle.png'
import pressure from '../../assets/images/types/pressure.png'
import speed from '../../assets/images/types/speed.png'
import toc from '../../assets/images/types/toc.png'
import tor from '../../assets/images/types/tor.png'

class ThumbnailsItem extends React.Component {
    constructor(props){
      super(props)
      this.icons = [],
      this.backgroundColor = '#8ee06d',
      this.color = '#fff',
      this.fontStyle = 'normal',
      this.fontWeight = 'normal',
      this.state = {
        opacity: new Animated.Value(1),
      }
      const states = this.props.thumbnails.states
      this.value = states.split(' ')
    }

    componentDidMount(){
      this._getImageFromType()
      this._backgroundColor()
      this._color()
      this._arrow()
      this._animate()
    }

    componentDidUpdate(nextProps){
      if(nextProps.thumbnails.id != this.props.thumbnails.id){
        console.log('new id')
        this._localNotif()
      } else if(nextProps.thumbnails.states != this.props.thumbnails.states){
        console.log('new states')
        this._localNotif()
      }
    }

    _getImageFromType(){
      const type = this.props.thumbnails.type
      //console.log(type)
      if(type === 'temperature'){
        this.icons = temperature
      } else if(type === 'hygrometry'){
        this.icons = hygrometry
      } else if(type === 'concentration'){
        this.icons = concentration
      } else if(type === 'conductivity'){
        this.icons = conductivity
      } else if(type === 'flow'){
        this.icons = flow
      } else if(type === 'generic'){
        this.icons = generic
      } else if(type === 'particles'){
        this.icons = particle
      } else if(type === 'pressure'){
        this.icons = pressure
      } else if(type === 'speed'){
        this.icons = speed
      } else if(type === 'toc'){
        this.icons = toc
      } else if(type === 'tor'){
        this.icons = tor
      }
    }

    _backgroundColor(){
      value = this.value
      //console.log(value)
      if(value.includes('hs')){
        this.backgroundColor = '#ddd' // lighten-grey
      } else if(value.includes('alarm')){
        this.backgroundColor = '#fd5d54' // $pale-red
        //this._localNotif()
      } else if(value.includes('prealarm')){
        this.backgroundColor = '#fdb44b' // $pale-orange
        //this._localNotif()
      } else if(value.includes('prod')){
        this.backgroundColor = '#e8ffcd' // $pale-green
      }
    }

    _color(){
      value = this.value
      if(value.includes('qaa')){
        this.color = '#005dbf' //$lime-blue
      } else if(value.includes('qai')){
        this.color = '#005dbf' //$lime-blue
      } else if(value.includes('qai')){
        this.color = '#005dbf', //$lime-blue
        this.fontStyle = 'italic'
      } else if(value.includes('hs')){
        this.color = '#9a9a9a' // $grey
      } else if(value.includes('notack')){
        this.fontWeight = '700'
      }
    }

    _arrow(){
      value = this.value       
      if(value.includes('high')){
        return(
          <Image className="float-sm-right" style={styles.arrow} source={require('../../assets/images/ArrowUp.png')}/>
        )
      } else if(value.includes('low')){
        return(
          <Image className="float-sm-right" style={styles.arrow} source={require('../../assets/images/ArrowDown.png')}/>
        )
      }
    }

    _critical(){
      const critical = this.props.thumbnails.critical
      if(critical === true){
        return(
          <Image className="float-sm-right" style={styles.critical} source={require('../../assets/images/critical-black.png')}/>
        )
      } else {

      }
    }

    _animate(){
      value = this.value
      if(value.includes('notack')){
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
      console.log('ok')
      this.value =this.value
      thumbnails = this.props.thumbnails
      this.lastId++;
      if(this.value.includes('alarm')){
        PushNotification.localNotification({
          /* iOS and Android properties */
          title: thumbnails.name, // (optional)
          message: thumbnails.type + ' | ' + thumbnails.value + ' ' + thumbnails.unit, // (required)
          largeIcon: "speed.png", // (optional) default: "ic_launcher"
          smallIcon: this._getImageFromType(), // (optional) default: "ic_notification" with fallback for "ic_launcher"
          //actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
          subText: "Local stockage | " + thumbnails.states, // (optional) default: none
          //color: "blue", // (optional) default: system default
          //ongoing: true, // (optional) set whether this is an "ongoing" notification
          //importance: 'high', // (optional) set notification importance, default: high
          //priority: 'high',
          //ticker: "My Notification Ticker", // (optional)
        })
      } else if(this.value.includes('prealarm')){
        PushNotification.localNotification({
          /* iOS and Android properties */
          title: thumbnails.name, // (optional)
          message: thumbnails.type + ' | ' + thumbnails.value + ' ' + thumbnails.unit, // (required)
          largeIcon: "speed.png", // (optional) default: "ic_launcher"
          smallIcon: this._getImageFromType(), // (optional) default: "ic_notification" with fallback for "ic_launcher"
          //actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
          subText: "Local stockage | " + thumbnails.states, // (optional) default: none
          //color: "blue", // (optional) default: system default
          //ongoing: true, // (optional) set whether this is an "ongoing" notification
          //importance: 'high', // (optional) set notification importance, default: high
          //priority: 'high',
          //ticker: "My Notification Ticker", // (optional)
        })
      }
    }    

    render() {
        const { thumbnails } = this.props;
      return (
        <TouchableOpacity onPress={this._localNotif()}>
          <Animated.View style={[{backgroundColor: this.backgroundColor, opacity: this.state.opacity},styles.button, styles.main_container]}>
          <Image style={styles.imageButton} source={this.icons}/>
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={[{color: this.color, fontStyle: this.fontStyle, fontWeight: this.fontWeight},styles.title_text]}>{thumbnails.name}</Text>
                {this._critical()}
              </View>
              <View style={styles.value_container}>
                <Text className="float-sm-left" style={styles.textButton}>{thumbnails.value}{' '}{thumbnails.unit}</Text>
                {this._arrow()}
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
    },
    imageButton: {
      height: 40,
      width: 40,
      margin: 2,
    },
    arrow: {
      height: 20,
      width: 20
    },
    critical: {
      height:12,
      width: 10
    }
  });

  export default ThumbnailsItem