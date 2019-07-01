import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import ThumbnailsList from './ThumbnailsList'
import Local from '../Local'

// API
import { getThumbnails } from '../../utils/api/Api'
import { getUser } from '../../utils/api/Api'

class Thumbnails extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        thumbnails: [],
      };
      this._recoverThumbnails = this._recoverThumbnails.bind(this);
      this.changeLocalSettings = new Local()
    }

    componentDidMount(){
      // Dans la plupart des cas, il est préférable d'attendre après le montage pour charger les données. 
      this.interval = setInterval(this._recoverThumbnails, 1000)
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }

    _recoverThumbnails() {
      console.log('update')
      getUser(this.changeLocalSettings.searchedServeur, this.changeLocalSettings.searchedPort, this.changeLocalSettings.searchedUser).then( data => {
        // console.log(data.thumbnails)
        // infos des vignettes
        this.setState({
          thumbnails:data.thumbnails,
        })
      })
    }

    render(){
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
                    recoverThumbnails={this._recoverThumbnails}
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

export default Thumbnails