import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, TextInput } from 'react-native'
import ThumbnailsList from './ThumbnailsList'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import {NavigationEvents} from 'react-navigation';

import PushNotification from 'react-native-push-notification';

import { connect } from 'react-redux'
import thumbnailsApi from '../../api/thumbnailsApi'

// SVG
import SettingsIcon from '../../assets/svg/SettingsIcon'
import SearchIcon from '../../assets/svg/SearchIcon'

const { width } = Dimensions.get('window');

class Thumbnails extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        thumbnails: [],
        isConnected: false,
        isLoading: false,
        searchText: '',
        registerToken: '',
        gcmRegistered: false,
        notification: []
      }
      this._recoverThumbnails = this._recoverThumbnails.bind(this);
    }

    componentDidMount(){
      this._socket()
      console.log(this.props.thumbnails)
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }

    _setInterval(){
      this.interval = setInterval(this._recoverThumbnails, 5000)  
    }

      // http://172.20.1.101:8080/notifications/alarms
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
          //let alarms = JSON.stringify(notif.body)
          this.setState({
            notification: JSON.parse(notif.body)
          })
          this._configure()
          //console.log(notif.title, notif.message)
        }, (Reconnect_failed ) => console.log(Reconnect_failed ))
      })
    }

    _configure() {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: (token) => {
          //console.log(token)
          this.setState({ registerToken: token.token, gcmRegistered: true });
        }, //this._onRegister.bind(this),
  
        // (required) Called when a remote or local notification is opened or received
        onNotification: this._test() /*function (notification){
          
          //traiter la notification
          
          // requis sur iOS uniquement
          notification.finish (PushNotificationIOS.FetchResult.NoData);
        }*/, //this._onNotification,
  
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

    _test(){
      const { notification } = this.state
      PushNotification.localNotification({
        message: notification.text
      })
    }

    _onNotification(){
      console.log('notification')
      const states = this.state.thumbnails.states
      const { notification } = this.state
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

    _recoverThumbnails() {
      console.log('update')
      const { searchedServeur, searchedPort, searchedUser } = this.props
      thumbnailsApi.getAllThumbnails(searchedServeur, searchedPort, searchedUser).then(data => {
        this.setState({
          thumbnails: data.thumbnails,
          isLoading: false,
          isConnected: false
        })
      })
    }

    _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

    _offline(){
      if(this.state.isConnected){
        return(
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>Veuillez saisir vos paramètres du local</Text>
          </View>
        )
      }
    }

    render(){
      const { thumbnails } = this.state
      return (
        <View style={styles.container}>
            {/* Gérer le paramétrage du local */}
            {this._offline()}
            <NavigationEvents onDidFocus={() => this._setInterval()} />
            <TouchableOpacity style={styles.search} onPress={() => this.props.navigation.navigate('Search')}>
              <SearchIcon/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settings}  onPress={() => this.componentWillUnmount() + this.props.navigation.navigate('Local')}>
              <SettingsIcon/>
            </TouchableOpacity>
            <View style={styles.main}>
              <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
              <View style={styles.spacer}/>
              <View>
                  <Text style={styles.text}>{thumbnails.length} BOUCLES EN ALARMES ET/OU A ACQUITTER</Text>
              </View>
              <View style={styles.spacer}/>
              <View style={styles.thumbnails_list}>
                <ThumbnailsList
                    thumbnails={thumbnails}
                  />
              </View>
              <View>
                <Text style={styles.text}>Glisser vers le bas</Text>
              </View>
            </View>
            {this._displayLoading()}
        </View>
      )
    } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4C626F',
    },
    settings: {
      position:'absolute',
      right:5,
      top:5
    },
    search: {
      position:'absolute',
      right:30,
      top:5
    },
    main: {
      alignItems:'center',
    },
    spacer: {
      height: 10,
    },
    logo: {
      marginTop: 50,
      height: 76,
      width: 253,
    },
    text: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: 'center'
    },
    thumbnails_list: {
      height: '73%',
    },
    local: {
      textAlign: 'right'
    },
    loading_container: {
      position: 'absolute',
      alignSelf:'flex-end',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    offlineContainer: {
      backgroundColor: '#fd5d54',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width,
      top: 30
    },
    offlineText: {
      color: '#fff'
    }
})

const mapStateToProps = (state) => {
  return {
    thumbnails: state.thumbnails,
    searchedServeur: state.searchedServeur,
    searchedPort: state.searchedPort,
    searchedUser:state.searchedUser
  }
}

export default connect(mapStateToProps)(Thumbnails)