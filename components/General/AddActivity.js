import React, { useEffect } from 'react'
import {View,Text,TouchableHighlight,Dimensions, StyleSheet,Animated} from 'react-native'

const height = Dimensions.get('window')
const AddActivity =(props) =>{

    const [animation] = React.useState(new Animated.Value(0))

    
    const interpolation = animation.interpolate({
        inputRange:[-1,1,2],
        outputRange:[0,1,0]
        })

        const  animationStyles={
          transform:[
            {
              scale:animation
            }
          ],
          opacity:interpolation
        }

    const Goanimation=()=>{
        props.handleAddTOdocustom().then(
            response => 
            {if(response === 200)
                Animated.timing(animation,{
                    toValue:2,
                    duration:1000
                  }).start(()=>props.handleLastAddAnimation(null))
            }).catch(error=>console.log(error))
        
    }

    const  cancleAnimation=()=>{
        
        Animated.timing(animation,{
            toValue:-1,
                duration:1000
          }).start(()=>props.handleLastAddAnimation(null))
    }

    useEffect(()=>{
       
        if(props.Visible)
            animation.setValue(1)
            else
            animation.setValue(0)

    },[props.Visible])


    return(
        <Animated.View style={[styles.animatedOverlay,animationStyles]}>
        <View style={{padding:10,marginBottom:5}}>
        <Text style={styles.button}>Are you ready to Travel here!!!!!</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableHighlight onPress={cancleAnimation} style={{width:'50%',alignItems:'center',padding:5,backgroundColor:'orange'}}><Text>Cancel</Text></TouchableHighlight>
        <TouchableHighlight onPress={Goanimation} style={{width:'50%',alignItems:'center',padding:5,backgroundColor:'green'}}><Text>Continue</Text></TouchableHighlight>
        </View>
            </Animated.View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    downTheLine:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    button:{
        fontSize:20,
        fontStyle:'italic',
        fontWeight:'bold',
    },
    buttoncancel:{
        padding:10,
        backgroundColor:'#ffa500',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:5
    },
    buttonFontYes:{
        padding:10,
        backgroundColor:'#32cd32',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:5
    },
    animatedOverlay:{
        justifyContent:'flex-start',
      backgroundColor:'#fa8072',
      borderWidth:2,opacity:1
      }
})

export default AddActivity

