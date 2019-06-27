import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native'
import ThumbnailsList from './thumbnails/ThumbnailsList'
// Api
import { getUser } from '../utils/api/Api';

class Local extends React.Component {

    constructor(props){
        super(props)
        this.searchedServeur = "",
        this.searchedUser = "",
        this.state = {
            thumbnails: [],
            isLoading: false
        }
        this._LoadThumbnails = this._LoadThumbnails.bind(this)
    }

    _LoadThumbnails(){
        this.setState({ isLoading: true})
            getUser(this.searchedServeur, this.searchedUser).then(data => {
                console.log(this.searchedServeur)
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
                <View style={styles.content_container}>
                <Text style={styles.title}> PARAMÉTRAGE DU LOCAL </Text>
                    <View style={styles.main_container}>
                        <Text style={styles.text}>Serveur</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText= {(text) => this.setState({ text })}
                            editable={true}
                            maxLength={40}
                            onChangeText={(serveur) => this._searchServeur(serveur)}
                            onSubmitEditing={() => this._searchThumbnails()}
                        />
                    </View>
                    <View style={styles.main_container}>
                        <Text style={styles.text}>Login</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText= {(text) => this.setState({ text })}
                            editable={true}
                            maxLength={40}
                            onChangeText={(user) => this._searchUser(user)}
                            onSubmitEditing={() => this._searchThumbnails()}
                        />
                    </View>
                    <View style={styles.spacer}/>
                    <Button title='valider'  color="#C4C4C4" onPress={() => this._searchThumbnails()}></Button>
                </View>
                <View style={styles.spacer}/>
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
        marginTop: 50
    },
    main_container: {
        height: 90,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems:'center'
    },
    title: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center'
    },
    text: {
        color: "#fff",
        textAlign: 'center'
    },
    textInput : {
        height: 40,
        width: 100,
        marginLeft: 30,
        color: 'white',
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    button:{
        width: 94,
        height: 32,
        marginTop: 10,
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
    },
    spacer: {
        height: 10,
    }
})

export default Local