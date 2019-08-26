import React from 'react'
import PushNotification from 'react-native-push-notification';
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default class NotifService extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            notification: []
        }
    }

    componentDidMount(){
        this._socket()
    }

    _socket(){
        var socket = new SockJS('http://172.20.1.101:8080/notifications/alarms', {
          agentOptions: {
            rejectUnauthorized: false
          }
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
        console.log(states)
        switch(true){
          case /^PA/.test(states):
              PushNotification.localNotification({
                /* iOS and Android properties */
                title: notification.type, // this.alarmeType + thumbnails.name
                message: notification.text, // (required)
                largeIcon: notification, // this.iconNotif
                smallIcon: notification, // this.arrow
                subText: notification, // this.localStockage + ' : ' + thumbnails.states
                color: "red",
                group:'alarm',
                importance: 'high'
              })
              break;
          case /PA_PRE/.test(states):
              PushNotification.localNotification({
                /* iOS and Android properties */
                title: notification,
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
      }

    render(){
        return(
            <React.Fragment/>
        )
    }

}