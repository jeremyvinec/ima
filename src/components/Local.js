import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Local extends React.Component {

    constructor(props){
        super(props)
        const { searchedServeur, searchedPort, searchedUser } = this.props
        this.state = {
            thumbnails: props.thumbnails,
            serveur: searchedServeur,
            port: searchedPort,
            user: searchedUser
        }
    }

    _searchServeur(serveur){
        const serveurAction = { type: 'SERVEUR', value: serveur}
        this.props.dispatch(serveurAction)
        console.log(this.props.dispatch(serveurAction))
    }

    _searchPort(port){
        const portAction = { type: 'PORT', value: port}
        this.props.dispatch(portAction)    
        console.log(this.props.dispatch(portAction))    
    }

    _searchUser(user){
        const userAction = { type: 'USER', value: user}
        this.props.dispatch(userAction)
        console.log(this.props.dispatch(userAction))
    }

    render(){
        const { serveur, port, user} = this.state
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
                                autoCapitalize = 'none'
                                placeholder={serveur || 'Nom du serveur'}
                                placeholderTextColor= '#C4C4C4'
                                onChangeText={(serveur) => this._searchServeur(serveur)}
                            />
                        </View>
                        <View style={styles.portLogin}>
                            <TextInput
                                style={styles.textInput}
                                editable={true}
                                maxLength={40}
                                autoCapitalize = 'none'
                                placeholder={port || 'port'}
                                placeholderTextColor= '#C4C4C4'
                                onChangeText={(port) => this._searchPort(port)}
                            />
                            <TextInput
                                style={styles.textInput}
                                editable={true}
                                maxLength={40}
                                autoCapitalize = 'none'
                                placeholder={user || 'login'}
                                placeholderTextColor='#C4C4C4'
                                onChangeText={(user) => this._searchUser(user)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.text}>VALIDER</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        marginTop: 20,
        alignItems:'center'
    },
    button: {
        margin: 5,
        padding: 5,
        width: 94,
        height: 32,
        backgroundColor: 'rgba(196, 196, 196, 0.3)' ,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20
      },
    title: {
        marginTop:50,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center'
    },
    text: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold'
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
        color: 'white',
        borderColor: 'white',
        borderWidth: 1
    },
    serveur : {
        height: 40,
        width: 210,
        textAlign: 'center',
        color: 'white',
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
      searchedServeur: state.searchedServeur, 
      searchedPort: state.searchedPort,
      searchedUser: state.searchedUser
    }
  }

export default connect(mapStateToProps)(Local)