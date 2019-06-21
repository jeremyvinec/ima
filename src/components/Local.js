import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class Local extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            text: 'ivt-qa2'
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.content_container}>
                    <View style={styles.main_container}>
                        <Text style={styles.text}>Serveur</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText= {(text) => this.setState({ text })}
                            editable={true}
                            maxLength={40}
                            value={this.state.text}
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
        alignItems: 'center',
        backgroundColor: '#4C626F',
    },
    content_container: {
        flex: 1,
        marginTop: 50
    },
    main_container: {
        height: 90,
        flexDirection: 'row',
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: 'center'
    },
    textInput : {
        height: 40,
        width: 100,
        color: 'white',
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1
    }
})

export default Local