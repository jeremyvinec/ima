import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import ThumbnailsList from './ThumbnailsList'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import {NavigationEvents} from 'react-navigation';

import { connect } from 'react-redux'
import thumbnailsApi from '../../api/thumbnailsApi'

// SVG
import SettingsIcon from '../../assets/svg/SettingsIcon'

const { width } = Dimensions.get('window');

class Thumbnails extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        thumbnails: [],
        isConnected: false,
        isLoading: false,
      }
      this._recoverThumbnails = this._recoverThumbnails.bind(this);
    }

    componentDidMount(){
      //this._socket()
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }

    _setInterval(){
      this.interval = setInterval(this._recoverThumbnails, 5000)  
    }

      // http://172.20.1.101:8080/notifications/alarms
    _socket(){
      var socket = new SockJS('https://ivtracer-ui/notifications/alarms', {
        protocolVersion: 8,
        origin: 'https://ivtracer-ui/notifications/alarms',
        rejectUnauthorized: false
      })
      stompClient = Stomp.over(socket)
      stompClient.connect({}, (frame) => {
        this.setState({ isConnected : true})
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/alarms/added', function (alarm) {
          console.log(alarm)
        })
      })
    }

    _recoverThumbnails() {
      console.log('update')
      this.setState({ isLoading: true })
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
            <TouchableOpacity style={styles.header}  onPress={() => this.componentWillUnmount() + this.props.navigation.navigate('Local')}>
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
    header: {
      position:'absolute',
      right:5,
      top:5
    },
    main: {
      alignItems:'center'
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
    thumbnails_list : {
      height: '70%'
    },
    local: {
      textAlign: 'right'
    },
    loading_container: {
      position: 'absolute',
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
    searchedServeur: state.searchedServeur,
    searchedPort: state.searchedPort,
    searchedUser:state.searchedUser
  }
}

export default connect(mapStateToProps)(Thumbnails)