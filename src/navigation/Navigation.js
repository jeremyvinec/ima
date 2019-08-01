import { createStackNavigator, createAppContainer } from 'react-navigation'
import Thumbnails from '../components/thumbnails/Thumbnails'
import Local from '../components/Local'
import Release from '../components/Release'
import Socket from '../socket/Socket'

const ThumbnailsStackNavigator = createStackNavigator({
    Thumbnails: {
        screen: Thumbnails,
        navigationOptions: {
            header: null
        }
    },
    Local: {
        screen: Local,
        navigationOptions: {
            title: 'Paramétrage du local'
        }
    },
    Release: {
        screen: Release,
        navigationOptions: {
            title: 'Acquitter'
        }
    },
    Socket: {
        screen: Socket,
        navigationOptions: {
            title: 'Socket'
        }
    }
})

export default createAppContainer(ThumbnailsStackNavigator)