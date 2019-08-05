import { createStackNavigator, createAppContainer } from 'react-navigation'
import Thumbnails from '../components/thumbnails/Thumbnails'
import Local from '../components/Local'
import Release from '../components/Release'

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
    }
})

export default createAppContainer(ThumbnailsStackNavigator)