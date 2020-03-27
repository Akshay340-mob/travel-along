import React,{useState,useEffect} from 'react'
import {FlatList,View,Text,ActivityIndicator,StyleSheet,Animated, Alert} from 'react-native'
import TravellingPlaces from '../../components/General/TravellingPlaces'
import {useSelector} from 'react-redux'

const TravelleingScreen =(props) => {
    const username = useSelector(state => state.info.username)

    const [isloaded,setIsLoaded] = useState(false)
    const [places,setPlaces] = useState([])

    useEffect(()=>{
        //This is backEnd Rest-Sevice which will bring data about the diffrent places
        HomeScreenServices.getServices('Travelling').then(response=>{
            if(response.data!=null){
            setPlaces(response.data)
           setIsLoaded(false)
        }}).catch(err=>Alert.alert('Travelling Fetch Error','Probably not connecting to server',[
            {text:'try again later'}
        ]))
    },[])

  
    return(
        <View style={{flex:1}}>
            {isloaded ?
             <ActivityIndicator size="large" color="green"/>:
             <FlatList
                  data={places}
                  keyExtractor = {item => item.name}
                  renderItem={itemData => <TravellingPlaces
                     name={itemData.item.name}
                     location={itemData.item.location}
                     image={itemData.item.image}
                     onSelect={()=>props.navigation.navigate('Travelling',{place:itemData.item.name})}
                />}
             />
            }
        </View>
    )

}

const styles = StyleSheet.create({            
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default TravelleingScreen
