import { createStackNavigator, createAppContainer } from 'react-navigation'
import Thumbnails from '../components/thumbnails/Thumbnails'
import Local from '../components/Local'
import Release from '../components/Release'
import Search from '../components/Search'

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
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Search'
        }
    }
})

export default createAppContainer(ThumbnailsStackNavigator)