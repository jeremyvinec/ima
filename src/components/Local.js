import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native'
import ThumbnailsList from './thumbnails/ThumbnailsList'
import { connect } from 'react-redux'

class Local extends React.Component {

    constructor(props){
        super(props)
        this.searchedServeur = '172.20.4.42',
        this.searchedPort = '8081',
        this.searchedUser = 'a',
        this.state = {
            thumbnails: props.thumbnails,
            isLoading: false
        }
        this._LoadThumbnails = this._LoadThumbnails.bind(this)
    }

    _LoadThumbnails(){
        this.setState({ isLoading: true})
            getUser(this.searchedServeur, this.searchedPort, this.searchedUser).then(data => {
                this.setState({
                    thumbnails: data.thumbnails,
                    isLoading: false
            })
        })
    }

    _searchThumbnails() {
        const serveurAction = { type: 'SERVEUR', value: this.searchedServeur}
        this.props.dispatch(serveurAction)
        this.setState({
            thumbnails: []
        }, () => {
            this._LoadThumbnails()
        })
    }

    _searchServeur(serveur){
        this.searchedServeur = serveur
    }

    _searchUser(user){
        this.searchedUser = user
    }

    _searchPort(port){
        this.searchedPort = port
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render(){
        console.log(this.state.thumbnails)
        return(
            <View style={styles.container}>
                <Text style={styles.title}> PARAMÉTRAGE DU LOCAL </Text>
                <View style={styles.content_container}>
                    <View>
                        <View>
                            <TextInput
                                style={styles.serveur}
                                onChangeText= {(text) => this.setState({ text })}
                                editable={true}
                                maxLength={40}
                                placeholder='Nom du serveur'
                                placeholderTextColor= '#C4C4C4'
                                onChangeText={(serveur) => this._searchServeur(serveur)}
                            />
                        </View>
                        <View style={styles.portLogin}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText= {(text) => this.setState({ text })}
                                editable={true}
                                maxLength={40}
                                placeholder='port'
                                placeholderTextColor= '#C4C4C4'
                                onChangeText={(port) => this._searchPort(port)}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText= {(text) => this.setState({ text })}
                                editable={true}
                                maxLength={40}
                                placeholder='login'
                                placeholderTextColor='#C4C4C4'
                                onChangeText={(user) => this._searchUser(user)}
                            />
                        </View>
                    </View>
                </View>
                <Button 
                    title='valider'  
                    color="#C4C4C4" 
                    onPress={() => this._searchThumbnails() /*+ this.props.navigation.navigate('Thumbnails')*/}
                />
                <View style={styles.thumbnails_list}>
                    <ThumbnailsList
                        thumbnails={this.state.thumbnails}
                        changeUser={this._LoadThumbnails}
                    />
                </View>
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4C626F',
    },
    content_container: {
        flex: 1,
        marginTop: 10,
        flexDirection:'row'
    },
    title: {
        marginTop:50,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center'
    },
    text: {
        color: "#fff",
        textAlign: 'center'
    },
    portLogin: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    textInput : {
        height: 40,
        width: 100,
        marginTop:10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    serveur : {
        height: 40,
        width: 210,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    thumbnails_list : {
        height: '70%'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
      thumbnails: state.thumbnails,
      searchedServeur: state.searchedServeur,
      searchedPort: state.searchedPort,
      searchedUser:state.searchedUser
    }
  }

export default connect(mapStateToProps)(Local)