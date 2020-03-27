
import {createAppContainer,createSwitchNavigator} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'
import RegisterScreen from '../screens/Auth/RegisterScreen' 
import LoginScreen from '../screens/Auth/LoginScreen'
import SeletedTravellingScreen from '../screens/Home/SelectedTravellingScreen'
import RedirectScreen from '../screens/Home/RedirectScreenEnhanced'
import HomeScreen from '../screens/Home/HomeScreen'



 const RegNavigator= createStackNavigator({
  Login:{screen:LoginScreen},
  Register:{screen: RegisterScreen}, 
  Splash:{screen:RedirectScreen}
 })
 
 const HomeNavigator = createStackNavigator({
  Home:{screen:HomeScreen},
  Travelling:{screen:SeletedTravellingScreen},
})

const AppNavigator = createSwitchNavigator({
  Auth: { screen: RegNavigator },
  Main: { screen: bottomNavigator },
});


const AppNavigator = createSwitchNavigator({
    Auth: { screen: RegNavigator },
    Main: { screen: HomeNavigator },
  });


export default createAppContainer(AppNavigator)
