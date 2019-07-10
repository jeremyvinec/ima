import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

class Release extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    BOUCLE 11 UU97533-12008 :
                    ACQUITTER 3 ALARMES
                </Text>
                <View style={styles.content_container}>
                    <View>
                        <TextInput
                            style={styles.serveur}
                            autoFocus={true}
                            editable={true}
                            maxLength={40}
                            placeholder='Identifiant: '
                            placeholderTextColor= '#C4C4C4'
                            onChangeText={(serveur) => this._searchServeur(serveur)}
                        />
                        <TextInput
                            style={styles.serveur}
                            editable={true}
                            maxLength={40}
                            placeholder='Mots de passe: '
                            placeholderTextColor= '#C4C4C4'
                            onChangeText={(serveur) => this._searchServeur(serveur)}
                        />
                        <TextInput
                            style={styles.serveur}
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
                            <View style={styles.button}>
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
    button: {
        margin: 5,
        padding: 5,
        width: 94,
        height: 32,
        backgroundColor: '#C4C4C4' ,
        opacity:0.3,
        borderRadius: 12,
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
        textAlign: 'center',
        fontWeight: 'bold'
    },
})

export default Release