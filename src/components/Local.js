import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

class Local extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            thumbnails: props.thumbnails,
            isLoading: false
        }
    }

    _searchServeur(serveur){
        const serveurAction = { type: 'SERVEUR', value: serveur}
        this.props.dispatch(serveurAction)
    }

    _searchPort(port){
        const portAction = { type: 'PORT', value: port}
        this.props.dispatch(portAction)        
    }

    _searchUser(user){
        const userAction = { type: 'USER', value: user}
        this.props.dispatch(userAction)
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
                    <View>
                        <View>
                            <TextInput
                                style={styles.serveur}
                                editable={true}
                                maxLength={40}
                                placeholder='Nom du serveur'
                                placeholderTextColor= '#C4C4C4'
                                //onChangeText={(serveur) => this._searchServeur(serveur)}
                            />
                        </View>
                        <View style={styles.portLogin}>
                            <TextInput
                                style={styles.textInput}
                                editable={true}
                                maxLength={40}
                                placeholder='port'
                                placeholderTextColor= '#C4C4C4'
                                //onChangeText={(port) => this._searchPort(port)}
                            />
                            <TextInput
                                style={styles.textInput}
                                editable={true}
                                maxLength={40}
                                placeholder='login'
                                placeholderTextColor='#C4C4C4'
                                //onChangeText={(user) => this._searchUser(user)}
                            />
                        </View>
                    </View>
                    <View style={styles.button}>
                    <Button 
                        title='valider'  
                        color="#C4C4C4" 
                        onPress={() => this.props.navigation.navigate('Thumbnails')}
                    />
                </View>
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
    },
    button: {
        margin: 5,
        padding: 5,
        width: 200,
        height: 90,
        borderRadius: 5,
        alignItems: 'center'
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
      //thumbnails: state.thumbnails,
      searchedServeur: state.searchedServeur, 
      searchedPort: state.searchedPort,
      searchedUser: state.searchedUser
    }
  }

export default connect(mapStateToProps)(Local)