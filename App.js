
import React,{useState} from 'react';
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import UserInfoReducer from './store/reducers/UserInfoReducer'
import LocationReducer from './store/reducers/LocationReducer'
import AppNavigator from './navigator/Navigator' 

const rootReducer =combineReducers({
  info:UserInfoReducer,
  location:LocationReducer
})


const store = createStore(rootReducer,applyMiddleware(thunk))



const App =()=>{

  const [fontLoaded, setFontLoaded] = useState(false);

  return(
    <Provider store={store}>
        <AppNavigator/>
    </Provider>
  
 )
}

export default App;
