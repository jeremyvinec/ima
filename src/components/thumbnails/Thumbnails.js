import React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
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
      /*console.log(this.changeLocalSettings.state)
      if(this.changeLocalSettings.state.isLoading){
        console.log('true')
        this._recoverThumbnails()
      }*/
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
            <TouchableHighlight style={styles.round} onPress={() => this.props.navigation.navigate('Local')}><View/></TouchableHighlight>
            <View style={{alignItems:'center'}}>
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
    round: {
      width:20,
      height:20,
      borderRadius:50,
      backgroundColor:'#8ee06d',
      position:'absolute',
      right:5,
      top:5
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
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