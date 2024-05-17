import { createStackNavigator } from 'react-navi';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/HomeScreen';

const screens = {
    Home: {
        screen: Home
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);