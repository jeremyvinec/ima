import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class Socket extends React.Component {
	
	constructor(props) {
		super(props);
		this.socket = SocketIOClient('http://localhost:80000'); // replace 'environment.serverUrl' with your server url
		this.socket.emit('channel1', 'Hi server'); // emits 'hi server' to your server
		
		// Listens to channel2 and display the data recieved
    this.socket.on('channel2', (data) => {
        console.log('Data recieved from server', data); //this will console 'channel 2'
      });
    }
	
	clicked = () => {
		
		const dataObj = {
			action: 'click'
		};
		
		this.socket.emit('channel2', dataObj);
	}

    render() {
        return(
            <View>
    			<Text> Socket.io with react native </Text>
           		<Button title='Click' onPress={() => this.clicked}></Button>
			</View>
        );
    }
}