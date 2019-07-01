import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native'
import ThumbnailsList from './thumbnails/ThumbnailsList'
// Api
import { getUser } from '../utils/api/Api';

class Local extends React.Component {

    constructor(props){
        super(props)
        this.searchedServeur = '172.20.4.42',
        this.searchedPort = '8081',
        this.searchedUser = 'a',
        this.state = {
            thumbnails: [],
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
        return(
            <View style={styles.container}>
                <Text style={styles.title}> PARAMÉTRAGE DU LOCAL </Text>
                <View style={styles.content_container}>
                    <View style={styles.main_container}>
                        <View>
                            <TextInput
                                style={styles.serveur}
                                onChangeText= {(text) => this.setState({ text })}
                                editable={true}
                                maxLength={40}
                                placeholder='Nom du serveur'
                                onChangeText={(serveur) => this._searchServeur(serveur)}
                                onSubmitEditing={() => this._searchThumbnails()}
                            />
                        </View>
                        <View style={styles.portLogin}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText= {(text) => this.setState({ text })}
                                editable={true}
                                maxLength={40}
                                placeholder='port'
                                onChangeText={(port) => this._searchPort(port)}
                                onSubmitEditing={() => this._searchThumbnails()}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText= {(text) => this.setState({ text })}
                                editable={true}
                                maxLength={40}
                                placeholder='login'
                                onChangeText={(user) => this._searchUser(user)}
                                onSubmitEditing={() => this._searchThumbnails()}
                            />
                        </View>
                        <View>
                            <Button style={styles.button} title='valider'  color="#C4C4C4" onPress={() => this._searchThumbnails() /*+ this.props.navigation.navigate('Thumbnails')*/}></Button>
                        </View>
                    </View>
                </View>
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
    main_container: {
        //height: 40,
        //marginTop: 10,
        //flexDirection: 'row',
        //justifyContent: 'space-between',
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
        color: 'white',
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    serveur : {
        height: 40,
        width: 210,
        color: 'white',
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    button:{
        width: 94,
        height: 32,
    },
    thumbnails_list : {
        height: '65%'
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

export default Local