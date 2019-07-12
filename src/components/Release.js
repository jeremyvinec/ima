import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import AckIcon from '../assets/svg/AckIcon'

class Release extends React.Component{

    render(){
        console.log(this.props.navigation.getParam('idThumbnails'))
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.navigation.getParam('idThumbnails')}
                </Text>
                <View style={styles.content_container}>
                    <View style={styles.content_textInput}>
                        <TextInput
                            style={styles.textInput}
                            autoFocus={true}
                            editable={true}
                            maxLength={40}
                            placeholder='Identifiant: '
                            placeholderTextColor= '#C4C4C4'
                            onChangeText={(serveur) => this._searchServeur(serveur)}
                        />
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            maxLength={40}
                            placeholder='Mots de passe: '
                            placeholderTextColor= '#C4C4C4'
                            onChangeText={(serveur) => this._searchServeur(serveur)}
                        />
                        <TextInput
                            style={styles.textInput}
                            editable={true}
                            multiline={true}
                            placeholder='Commentaire: '
                            placeholderTextColor= '#C4C4C4'
                            onChangeText={(serveur) => this._searchServeur(serveur)}
                        />
                    </View>
                    
                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Thumbnails')}>
                            <View style={styles.button}>
                                <Text style={styles.text}>ANNULER</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Thumbnails')}>
                            <View style={[styles.button, styles.acquitter]}>
                                <AckIcon style={styles.ack}/>
                                <Text style={styles.text}>ACQUITTER</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        marginTop: 10,
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ack: {
        color: 'white'
    },
    acquitter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        margin: 5,
        padding: 5,
        width: 120,
        height: 32,
        backgroundColor: 'rgba(196, 196, 196, 0.3)' ,
        borderRadius: 12,
        alignItems: 'center',
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
        fontWeight: 'bold',
    },
    content_textInput: {
        textAlign: 'left',
    },
    textInput: {
        color: 'white'
    }
})

export default Release