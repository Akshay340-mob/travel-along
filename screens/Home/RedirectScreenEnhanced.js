
import React,{Component} from 'react'
import {View,Text,StyleSheet, Animated, TouchableWithoutFeedback,Alert,AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import {UserInfoAction} from '../../store/actions/UserInfoAction'
import {locationAction} from '../../store/actions/LocationAction' 
import {userLocationAction} from '../../store/actions/LocationAction'
import Geolocation from 'react-native-geolocation-service'; 
import axios from 'axios'
import ENV from '../../constants/API'

class RedirectScreen extends Component {
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1),
    isLoading:true,
    error:null
  };
  intervalID =0

   username=this.props.navigation.getParam('username')

  async componentDidMount (){
    this.intervalID=setInterval(() => {

      this.handlePress()
  },500)

let geoOptions = {
  enableHighAccuracy:false,
  timeOut: 20000,
  maximumAge: 60 * 60 * 24
};

 Geolocation.getCurrentPosition( this.geoSuccess, 
                                      this.geoFailure,
                                      geoOptions);
}


geoFailure = (err) => {
 
  this.setState({
      error: err.message,
  });
}

geoSuccess = async(location) => {
 
  if(location.coords.latitude != null){
 
    try{
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${ENV.API_KEY}`).
      then(response => {
     if(response!=null){
           const locate=response.data.results[0].address_components.
           filter(address => address.types.indexOf("sublocality_level_1") > -1 || address.types.indexOf("locality") > -1) 
       const userLocation={
        latitude:location.coords.latitude,
        longitude:location.coords.longitude, 
        region:locate[0].long_name,
        city:locate[1].long_name
       }
       
        this.props.saveuserLocation(userLocation)
        this.props.saveLocation(location)
        const responses =  this.props.userInfo(this.username)
       if(responses)
       this.setState({
          isLoading:false
        },()=>{this.props.navigation.navigate('Home')})}
      }).catch(error =>console.log(error))
    
      
    
    }
    catch(error)   {
      Alert.alert('Error While fetching location',error+'Open Your Location!! Soory for Inconvinience and TRY AGAIN!!:)',
      [{text:'Ok'}])
    }
        }
    else
    {
      Alert.alert('Error While fetching location','Open Your Location!! Soory for Inconvinience and TRY AGAIN!!:)',
      [{text:'Ok'}])
    }
}
  
componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handlePress = () => {
    this.state.animation.setValue(0);
    this.state.opacity.setValue(1);

    Animated.timing(this.state.animation, {
      duration: 200,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 200,
        }).start();
      }
    });
  };
  render() {
    const progressInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    });

    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#cd5c5c", "#7cfc00"],
    });

    const progressStyle = {
      width: progressInterpolate,
      bottom: 0,
      opacity: this.state.opacity,
      backgroundColor: colorInterpolate,
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.button}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View style={[styles.progress, progressStyle]} />
            </View>
            <Text style={styles.buttonText}>Loading Bro!</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e6537d",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    backgroundColor: "transparent",
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});

const mapDispatchToProps=(dispatch)=>{
    return{
        userInfo:(username)=>dispatch(UserInfoAction(username)),
        saveLocation:(location)=>dispatch(locationAction(location)),
        saveuserLocation:(userLocation)=>dispatch(userLocationAction(userLocation))
    }
}


export default connect(null,mapDispatchToProps)(RedirectScreen)
