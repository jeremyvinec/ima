import React from 'react'
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux'

class NotifService extends React.Component{


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
        const { notification } = this.props
        const states = notification.type
        console.log(states)
        switch(true){
          case /^alarm/.test(states):
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
          case /prealarm/.test(states):
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
}

const mapStateToProps = (state) => {
    return{
        notification: state.notification
    }
}

export default connect(mapStateToProps)(NotifService)