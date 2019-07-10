import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import ThumbnailsList from './ThumbnailsList'

import { connect } from 'react-redux'
import thumbnailsApi from '../../api/thumbnailsApi'

class Thumbnails extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        thumbnails: []
      }
      //this._recoverThumbnails = this._recoverThumbnails.bind(this);
    }

    componentDidMount(){
      // Dans la plupart des cas, il est préférable d'attendre après le montage pour charger les données. 
      //this.interval = setInterval(this._recoverThumbnails, 1000)
      this._recoverThumbnails()
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }

    _recoverThumbnails() {
      console.log('update')
      const { searchedServeur, searchedPort, searchedUser } = this.props
      thumbnailsApi.getAllThumbnails(searchedServeur, searchedPort, searchedUser).then(data => {
        this.setState({
          thumbnails: data.thumbnails
        })
      })
    }

    render(){
      console.log(this.props)
      return (  
        <View style={styles.container}>
            <TouchableOpacity style={styles.header}  onPress={() => this.props.navigation.navigate('Local')}>
              <Image style={styles.settings} source={require('../../assets/images/settings.png')}/>
            </TouchableOpacity>
            <View style={styles.main}>
              <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
              <View style={styles.spacer}/>
              <View>
                  <Text style={styles.text}>{this.state.thumbnails.length} BOUCLES EN ALARMES ET/OU A ACQUITTER</Text>
              </View>
              <View style={styles.spacer}/>
              <View style={styles.thumbnails_list}>
                <ThumbnailsList
                    thumbnails={this.state.thumbnails}
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
    settings: {
      width:20,
      height:20,
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
    }
})

const mapStateToProps = (state) => {
  return {
    //thumbnails: state.thumbnails,
    searchedServeur: state.searchedServeur,
    searchedPort: state.searchedPort,
    searchedUser:state.searchedUser
  }
}

export default connect(mapStateToProps)(Thumbnails)