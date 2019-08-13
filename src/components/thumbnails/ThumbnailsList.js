import React from 'react'
import { StyleSheet, FlatList, ProgressBarAndroid } from 'react-native'
import ThumbnailsItem from './ThumbnailsItem'
import { withNavigation } from 'react-navigation'

class ThumbnailsList extends React.Component {

  constructor(props) {
    super(props)
  }

  _displayRelease = (idThumbnails) => {
    this.props.navigation.navigate("Release", { idThumbnails: idThumbnails })
  }

  render() {
    return (
        <FlatList
          contentInset={{bottom: 90}}
          style={styles.list}
          data={this.props.thumbnails}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          initialNumToRender={100}
          renderItem={({item}) => ( 
            <ThumbnailsItem 
              thumbnails={item}
              displayRelease={this._displayRelease}
            />
          )}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
})

export default withNavigation(ThumbnailsList)
