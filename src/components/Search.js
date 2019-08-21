import React from 'react'
import { StyleSheet, Dimensions, Animated, View, TextInput } from 'react-native';
import thumbnailsApi from '../api/thumbnailsApi'

import { connect } from 'react-redux'

class Search extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            thumbnails: [],
            searchedText: '',
            isLoading: false
        }
    }

    _searchThumbnails(){
        this.setState({
            thumbnails: [],
        }, () => {
            this._loadThumbnails()
        })
    }

    _loadThumbnails(){
        if(this.state.searchedText > 0){
            this.setState({ isLoading: true })
            thumbnailsApi
        }
    }


    render(){
        const {searchedText} = this.state;
        console.log(this.props.thumbnails)
        return(
                <View style={styles.container}>
                    <View style={styles.content_container}>
                        <TextInput
                            style={styles.input}
                            placeholder='Recherche'
                            placeholderTextColor= '#C4C4C4'
                            onChangeText={(searchedText) => this.setState({searchedText})}
                            onSubmitEditing={() => this._searchThumbnails()}
                        />
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
    content_container: {
        flex: 1,
        marginTop: 20,
        alignItems:'center'
    },
    input: {
      backgroundColor: '#fff',
      color: 'black',
      fontSize: 15,
      borderRadius: 5,
      width: Dimensions.get('window').width * 0.7,
    },
  })

const mapStateToProps = (state) => {
    return {
      thumbnails: state.thumbnails
    }   
}

export default connect(mapStateToProps)(Search)