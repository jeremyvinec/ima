import { createStackNavigator, createAppContainer } from 'react-navigation'
import Thumbnails from '../components/thumbnails/Thumbnails'
import Local from '../components/Local'

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
    }
})

export default createAppContainer(ThumbnailsStackNavigator)