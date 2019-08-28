import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import ThumbnailsList from './ThumbnailsList'

import {NavigationEvents} from 'react-navigation';

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
      thumbnailsApi.getAllThumbnails( searchedServeur, searchedPort, searchedUser ).then(data => {
        this.setState({
          thumbnails: data.probes,
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
    notification: state.notification,
    searchedServeur: state.searchedServeur,
    searchedPort: state.searchedPort,
    searchedUser:state.searchedUser
  }
}

export default connect(mapStateToProps)(Thumbnails)