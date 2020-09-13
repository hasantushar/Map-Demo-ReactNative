import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MainScreen from './src/MainScreen';
import ModalTester from './src/ModalTester';

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

const navigator2 = createBottomTabNavigator({
  main: MainScreen,
  modal: ModalTester
});

export default createAppContainer(navigator);