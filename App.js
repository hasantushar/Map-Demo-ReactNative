import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/MainScreen';

const navigator = createStackNavigator(
  {
    Main: MainScreen
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerShown: false
      //title: 'Map Test'
    }
  }
);



export default createAppContainer(navigator);