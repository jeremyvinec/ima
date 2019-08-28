import React from 'react'
import PushNotification from 'react-native-push-notification';
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default class NotifService extends React.Component{

    constructor(props){
        super(props)
        this.iconNotif = '',
        this.arrow = 'ic_stat_icon_ivtracer',
        this.state = {
            notification: []
        }
    }

    componentDidMount(){
        this._socket()
        //this._websocket()
    }

    _iconNotif(){
      type = this.state.notification.probeType
      console.log(type)
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

    _arrow(){
      type = this.state.notification.type   
      switch(true){
        case /^PA_HIGH/.test(type):
            this.arrow = 'ic_arrowup'
        case /^PA_PRE_HIGH/.test(type):
            this.arrow = 'ic_arrowup'
        case /^PA_LOW/||/^PA_PRE_LOW/.test(type):
            this.arrow = 'ic_arrowdown'
        case /^PA_PRE_LOW/.test(type):
            this.arrow = 'ic_arrowdown'
      }
    }

    _websocket(){
      const ws = new WebSocket('wss://172.20.4.46/notifications/alarms', {
      rejectUnauthorized: false
      })

      ws.onerror = (event) => {
        console.error("WebSocket error observed:", event);
      }

      ws.onopen = () => {
        // connection opened
        console.log('ok')
        ws.send('something'); // send a message
      }

      ws.onclose = function close() {
        console.log('disconnected');
      }
    }

    _socket(){
        var socket = new SockJS('http://172.20.1.101:8080/notifications/alarms', {
          transports: ['websocket'], rejectUnauthorized: false
        })
        stompClient = Stomp.over(socket)
        stompClient.connect({}, (frame) => {
          this.setState({ isConnected : true, isLoading: true })
          console.log('Connected: ' + frame)
          stompClient.subscribe('/topic/alarms', (notif) => {
            const notification = JSON.parse(notif.body)
            this.setState({ notification: notification})
            this._configure()
            //console.log(notif.title, notif.message)
          }, (Reconnect_failed ) => console.log(Reconnect_failed ))
        })
    }

    _configure() {
        console.log('configure')
        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: (token) => {
            //console.log(token)
            this.setState({ registerToken: token.token, gcmRegistered: true });
          }, //this._onRegister.bind(this),
    
          // (required) Called when a remote or local notification is opened or received
          onNotification: this._onNotification(),
    
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

      _onNotification(){
        console.log('notification')
        //const states = this.state.thumbnails.states
        const { notification } = this.state
        const states = notification.type
        this._iconNotif()
        this._arrow()
        switch(true){
          case /^PA/.test(states):
              PushNotification.localNotification({
                /* iOS and Android properties */
                //title: notification.originId, // this.alarmeType + thumbnails.name
                message: notification.text, // (required)
                largeIcon: this.iconNotif, // this.iconNotif
                smallIcon: this.arrow, // this.arrow
                subText: notification.room, // this.localStockage + ' : ' + thumbnails.states
                color: "red",
                group:'alarm',
                importance: 'high'
              })
              break;
          case /^PA_PRE/.test(states):
              PushNotification.localNotification({
                /* iOS and Android properties */
                //title: notification.originId,
                message: notification.text, // (required)
                largeIcon: notification, // (optional) default: "ic_launcher"
                smallIcon: notification, // (optional) default: "ic_notification" with fallback for "ic_launcher"
                subText: notification, // (optional) default: none
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

    render(){
        return(
            <React.Fragment/>
        )
    }

}