import React from 'react'
import {View,TouchableOpacity,Image,Text,StyleSheet} from 'react-native'


const PlacesItem= props=>{

    return(
        <View style={styles.place}>
        <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.imageContainer}>    
        {props.image!=null?
            <Image style={styles.image} source={{uri:props.image}}/>
            :<Image style={styles.image} source={{uri:'--No image url--'}}/>
             }
        </View>
           <View style={styles.name_rat}>
            <Text style={{color:'#CD5C5C',fontSize:20}}>{props.name}</Text>
            </View>
           <Text style={{alignItems:'center',color:'#45B39D'}}>{props.location}</Text>
            
        </TouchableOpacity>
        </View>
    )

}

const styles=StyleSheet.create({
    place:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20
    },
    imageContainer:{
        width:'100%',
        height:'70%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    name_rat:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'20%',
        paddingHorizontal:20
    }
})

export default PlacesItem