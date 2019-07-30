import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ThumbnailsItem from './ThumbnailsItem'
import { withNavigation } from 'react-navigation'

class ThumbnailsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      thumbnails: [],
      isFetching: false
    }
  }

  _displayRelease = (idThumbnails) => {
    this.props.navigation.navigate("Release", { idThumbnails: idThumbnails })
  }

  _onRefresh() {
    this.setState({ isFetching: true })
  }

  render() {
    return (
        <FlatList
          contentInset={{bottom: 90}}
          style={styles.list}
          data={this.props.thumbnails}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          refreshing={this.state.isFetching}
          onRefresh={() => this._onRefresh()}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={1}
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
