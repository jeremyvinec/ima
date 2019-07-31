import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, NetInfo, Dimensions } from 'react-native'
import ThumbnailsList from './ThumbnailsList'
import Offline from '../Offline'

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
        isConnected: true
      }
      this._recoverThumbnails = this._recoverThumbnails.bind(this);
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }

    _setInterval(){
      this.interval = setInterval(this._recoverThumbnails, 5000)  
    }

    _recoverThumbnails() {
      console.log('update')
      const { searchedServeur, searchedPort, searchedUser } = this.props
      thumbnailsApi.getAllThumbnails(searchedServeur, searchedPort, searchedUser).then(data => {
        this.setState({
          thumbnails: data.thumbnails,
          isConnected: false
        })
      })
    }

    _offline(){
      return(
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )
    }

    render(){
      const { thumbnails } = this.state
      return (
        <View style={styles.container}>
            {/* Gérer le paramétrage du local */}
            {/*this._offline()*/}
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
    offlineContainer: {
      backgroundColor: '#b52424',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      width,
      top: 30
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