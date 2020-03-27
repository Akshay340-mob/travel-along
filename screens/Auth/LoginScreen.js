import React, { Component } from "react";
import { StyleSheet,ImageBackground, Text, TextInput, TouchableHighlight,
          TouchableOpacity, View, Image, Animated,Dimensions, KeyboardAvoidingView } from "react-native";
import UserDetailServices from '../../services/UserDetailServices'
import Icon from 'react-native-vector-icons/FontAwesome';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const createAnimationStyle = animation => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animation,
    transform: [
      {
        translateY,
      },
    ],
  };
};

const {width} = Dimensions.get('window')

 class Login extends Component {

  constructor(props)
  {
    super(props) 
     this.state = {
    email: new Animated.Value(0),
    password: new Animated.Value(0),
    button: new Animated.Value(0),
    phoneNo :new Animated.Value(0),
    otpan: new Animated.Value(0),
    username:null,
    pass:null,
    error:null,
    forgotPassClicked:false,
    phone:null,
    otp:null,
  };
  }

  componentDidMount() {
      
    Animated.stagger(100, [
      Animated.timing(this.state.email, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.password, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.button, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }

  onForgotPasswordClicked=()=>{
    this.setState({forgotPassClicked:true},
        Animated.stagger(100, [
            Animated.timing(this.state.phoneNo, {
              toValue: 1,
              duration: 200,
            }),
            Animated.timing(this.state.otpan, {
              toValue: 1,
              duration: 200,
            }),
            Animated.timing(this.state.button, {
              toValue: 1,
              duration: 200,
            }),
          ]).start(()=>{ this.state.email.setValue(0)
            this.state.password.setValue(0)  
            }))
      }

  normalHandler=()=>{
    console.log('dasdashiiiii')

  this.setState({forgotPassClicked:false},
      Animated.stagger(100, [
          Animated.timing(this.state.email, {
            toValue: 1,
            duration: 200,
          }),
          Animated.timing(this.state.password, {
            toValue: 1,
            duration: 200,
          }),
          Animated.timing(this.state.button, {
            toValue: 1,
            duration: 200,
          }),
        ]).start(()=>{ this.state.phoneNo.setValue(0)
                           this.state.otpan.setValue(0)  
        }))
  
}

  loginHandler=()=>{
    this.setState({
      error:null
    })
    if(this.state.forgotPassClicked)
    {
        console.log(this.state.phone)
        console.log(this.state.otp)
    }
    else{  
    UserDetailServices.authenticateuser(this.state.username,this.state.pass).then(response=>{
    if(response.status===200)
      {
          this.props.navigation.navigate('Splash',{username:this.state.username})
      }
  }).catch(error=>{
        this.setState({
          error:error
        })
     })
    }
    
  }

  

  render() {
    const emailStyle = createAnimationStyle(this.state.email);
    const passwordStyle = createAnimationStyle(this.state.password);
    const phoneStyle=createAnimationStyle(this.state.phoneNo)
    const otpStyle = createAnimationStyle(this.state.otpan)
    const buttonStyle = createAnimationStyle(this.state.button);
   

    return (
      <View style={styles.container}>
        <ImageBackground
        source={this.state.forgotPassClicked ?
         {uri: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} 
                : {uri: "https://image.shutterstock.com/image-photo/spring-blossom-background-beautiful-nature-260nw-1033292395.jpg"}} 
        style={{width: '100%', height: '100%'}}>
          <View style={styles.container} />
         
          <KeyboardAvoidingView style={styles.form} behavior="padding">
            {this.state.error!=null && 
            (<Text style={{color:'red',fontSize:15,fontFamily:'open-sans-bold'}}>Enter Your Details Properly</Text>)}
            {this.state.forgotPassClicked ?
                <View style={styles.container}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <AnimatedTextInput
                style={[styles.input, phoneStyle]}
                placeholder="PhoneNumber"
                keyboardType="numeric"
                onChangeText={(text)=>this.setState({phone:text})}
              /><Icon name="arrow-circle-right" size={15} color="#deb887" style={{marginLeft:10}}></Icon></View>
              <AnimatedTextInput
                placeholder="OTP"
                style={[styles.input, otpStyle]}
                keyboardType="numeric"
                onChangeText={(text)=>this.setState({otp:text})}
              />

            <TouchableOpacity onPress={this.loginHandler}>
                <Animated.View style={[styles.button, buttonStyle]}>
                  <Text style={styles.buttonText}>Login</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableHighlight onPress={()=>{this.normalHandler()}}><Text style={styles.title}>Normal Login ?</Text></TouchableHighlight>
              </View>
            :
            <View style={styles.container}>
              <AnimatedTextInput
                ref={email => (this._email = email)}
                style={[styles.input, emailStyle]}
                placeholder="email"
                keyboardType="email-address"
                onChangeText={(text)=>this.setState({username:text})}
              />
              <AnimatedTextInput
                placeholder="Password"
                style={[styles.input, passwordStyle]}
                secureTextEntry
                onChangeText={(text)=>this.setState({pass:text})}
              />
              <TouchableOpacity onPress={this.loginHandler}>
                <Animated.View style={[styles.button, buttonStyle]}>
                  <Text style={styles.buttonText}>Login</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableHighlight onPress={()=>this.onForgotPasswordClicked()}><Text style={styles.title}>Forgot Password ?</Text></TouchableHighlight>
              </View>
            }
          </KeyboardAvoidingView>
          <View style={styles.container} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
    margin:10
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.25)",
    paddingVertical: 10,
  },
  input: {
    width: width*3/4,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFF",
    color: "#333",
    backgroundColor: "#FFF",
  },
  button: {
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
});

export default Login