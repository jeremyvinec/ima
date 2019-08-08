import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {StompEventTypes, withStomp} from 'react-stompjs'

class Stomp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'Not Connected',
    }
  }

  componentDidMount(): void {
    console.log(this.props)
    this.props.stompContext.addStompEventListener(
        StompEventTypes.Connect,
        () => {this.setState({status: 'Connected'})}
    )
    this.props.stompContext.addStompEventListener(
        StompEventTypes.Disconnect,
        () => {this.setState({status: 'Disconnected'})}
    )
    this.props.stompContext.addStompEventListener(
        StompEventTypes.WebSocketClose,
        () => {this.setState({status: 'Disconnected (not graceful)'})}
    )
    this.props.stompContext.newStompClient(
        'https://ivtracer-ui/notifications/alarms',  // https://www.example.com/stomp
        /*'loming',  // loming
        '12345678',  // 12345678
        '/'*/)  // it's '/' most likely
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <View><Text>Status: {this.state.status}</Text></View>
      </View>
    )
  }
}

export default withStomp(Stomp)