import React from 'react'
import { StyleSheet, FlatList, Dimensions, View } from 'react-native'
import ThumbnailsItem from './ThumbnailsItem'
import { withNavigation } from 'react-navigation'
import SwipeView from 'react-native-swipeview';

class ThumbnailsList extends React.Component {

  _displayRelease = (idThumbnails) => {
    this.props.navigation.navigate("Release", { idThumbnails: idThumbnails })
  }

  _sort(){
    this.props.thumbnails.sort((a, b) => {
      console.log(a)
      console.log(b)
      //if(a.states(/alarme/.test(a.states)) > b.states(/prealarm/.test(a.states))) return 1
      return a.states - b.states
      /*const alarm = /^alarm/.test(thumbnails.states)
      const prealarm = /prealarm/.test(thumbnails.states)
      const prod = /prod/.test(thumbnails.states)
      const hs = /hs/.test(thumbnails.states)
      const offline = /offline/.test(thumbnails.states)
      console.log(alarm - prealarm - prod - hs - offline)
      if(alarm > prealarm) return 1
      if(prealarm > prod) return 1
      if(prod > hs) return 1
      if(hs > offline) return 1*/
      //console.log(alarm, prealarm)
      //console.log(alarm - prealarm)
      //return alarm > prealarm > prod > hs > offline
    })
  }

  deleteItemById = (id) => {
    console.log(this.state.thumbnails)
    console.log('delete thumbnails')
    const filteredData = this.state.data.filter(item => item.id !== id);
    //this.props.thumbnails = filteredData
    this.setState({ data: filteredData });
  }

  render() {
    const { thumbnails } = this.props
    this.rightOpenValue = -Dimensions.get('window').width;
    return (
        <FlatList
          contentInset={{bottom: 90}}
          style={styles.list}
          data={thumbnails} // thumbnails.sort((a,b) => a.states.localeCompare(b.states))
          extraData={this.state}
          keyExtractor={(item) => item.id}
          initialNumToRender={100}
          renderItem={({item}) => (
            <SwipeView onSwipedLeft={() => this.deleteItemById(item.id)}
              renderVisibleContent={() => 
              <ThumbnailsItem 
                thumbnails={item}
                displayRelease={this._displayRelease}
              />}
              rightOpenValue = {this.rightOpenValue}
              //disableSwipeToRight = {true}
            />
          )}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
})

export default withNavigation(ThumbnailsList)
