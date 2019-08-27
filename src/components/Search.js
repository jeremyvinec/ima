import React from 'react'
import { StyleSheet, Dimensions, Animated, View, TextInput } from 'react-native';
import ThumbnailsList from './thumbnails/ThumbnailsList'

import { connect } from 'react-redux'

class Search extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            thumbnails: props.thumbnails,
            searchedText: '',
            isLoading: false
        }
    }

    _searchThumbnails(searchedText){
        this.setState({ 
            searchedText: searchedText
        }, () => {
            this._loadThumbnails()
        })
    }

    _loadThumbnails(){
        console.log(this.state.searchedText)
        const { searchedText } = this.state
        const name = JSON.stringify(this.state.thumbnails)
        console.log(name)
        if(searchedText > 0){
            this.setState({ isLoading: true })
            switch(true){
                case searchedText.test(name):
                    console.log('ok')
            }
        }
    }


    render(){
        const { searchedText } = this.state
        return(
                <View style={styles.container}>
                    <View style={styles.content_container}>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder='Recherche'
                                placeholderTextColor= '#C4C4C4'
                                onChangeText={(searchedText) => this._searchThumbnails(searchedText)}
                                onSubmitEditing={() => this._searchThumbnails()}
                            />
                        </View>
                        <View style={styles.thumbnails_list}>
                        <ThumbnailsList
                            thumbnails={this._searchThumbnails}
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
    thumbnails_list: {
        height: '73%',
    }
  })

const mapStateToProps = (state) => {
    return {
      thumbnails: state.thumbnails
    }   
}

export default connect(mapStateToProps)(Search)