import React,{useEffect} from 'react'
import {Dimensions,Image,View,ScrollView,Text,ActivityIndicator,TouchableOpacity,StyleSheet,Button} from 'react-native'
import Moment from '../../components/General/Moment'
import {Overlay} from 'react-native-elements'
import DatePicker from '../../components/General/DatePicker'
import {useSelector} from 'react-redux'
import axios from 'axios'
import ENV from '../../constants/API'
import AddActivity from '../../components/General/AddActivity'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';

const {width,height}=Dimensions.get('window')
const ovelayWidth=width-50

const SeletedTravellingScreen = (props) =>{
    const [images,setImages] = React.useState([])
    const[isVisible,setIsVisible] = React.useState(false)
    const[loading,setLoading] = React.useState(true)
    const [startDate,setStartDate] =React.useState()
    const [EndDate,setEndDate] =React.useState()
    const place=props.navigation.getParam('place')
    const username=useSelector(state=>state.info.username)
    const [Visible,setVisibility] = React.useState(false)
    const stable=(imagess)=>{
    
        if(imagess.length>0){
            setImages(imagess.length>0?imagess.map
                ( photoReference =>
                  ({id:Math.floor((Math.random() * 10000+340) + 1),
                    url:photoReference})):null)
            setLoading(false)}
    }
    const storage = firebase.storage()
    
    useEffect(()=>{
            var ref= storage.ref('--all places images nearby --').child(place)
        // files = array of file objects
        // not the contents of these files, we're not downloading the files. 
       imagess = []
          length=0,i=0
                 ref.listAll().then( res => {
                 // for files like images
                 length = res.items.length
       
                   res.items.forEach( item => {
        
                   item.getDownloadURL().then( url => {
            
                        imagess.push(url)
                   }
                      ).then(()=>{ i=i+1;
                
                          if( length === i) 
                                {stable(imagess)}
                      }).catch( error => console.log(error))
                     
                });
                     
            }).catch(error => console.log(error))
           
        },[])

    
        const VisiblityHandler=()=>{
            setIsVisible(!isVisible)
        }

        const setStartdate=(date)=>{
            setStartDate(date)
        }

        const setendDate=(date)=>{
            setEndDate(date)
        }

        const AddEventHandler=()=>{
            return new Promise((resolve,reject)=>{
                const activity={
                    startDate:startDate,
                    endDate:EndDate,
                    place:place,
                    username:username
                }
             axios.post(`create a rest API for saving data`,activity).
                then((response)=>{
                    if(response.data.status === 200)
                    {
                        resolve(response.data.status)
                    }
                    else
                    reject('Somethingh went wrong')
                }).catch(error => console.log(error))
            })
        }

        const handleLastAddAnimation=(data)=>{
            setVisibility(!Visible)
        }

    return(
        loading?  <ActivityIndicator size="large" color="#0000ff" />:
        <ScrollView>
       
            <Moment images={images} VisiblityHandler={VisiblityHandler}/>
        
           <View style={{alignItems:'center',margin:10,}}><Text>{place}</Text></View>
    <View style={{alignItems:'center',margin:10}}><Text>! Want to Visit between??</Text></View>
          
              <View style={{alignItems:'flex-start',margin:10}} >
              <DatePicker date={startDate} onselect={setStartdate}/>
              <Text>Start Date</Text>
              </View>
              <View style={{alignItems:'flex-end',margin:10}}>
              <DatePicker date={EndDate} onselect={setendDate}/>
                <Text>End Date</Text>
              </View>
          

           <View style={{alignItems:'center',margin:10}}>
           <Button title="Add" onPress={()=>handleLastAddAnimation(null)}/>
           
           </View>
     <Overlay
      isVisible={isVisible}
      onBackdropPress={() =>setIsVisible(false)}
         width={ovelayWidth}
        height={height-100}
    >
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'red',alignSelf:'flex-end'}} onPress={VisiblityHandler}>close</Text>
       <ScrollView
           horizontal={true}
           pagingEnabled
           style={styles.backgroundImage}
            >
               {images.map((image) => (
                <Image
                  style={styles.backgroundImage}
                  key={Math.floor((Math.random() * 10000+340) + 1)}
                  source={{uri:image.url}}   
                />
              ))}
            </ScrollView>
    </View>
    </Overlay>
    {Visible  ?
        <TouchableOpacity onPress={()=>handleLastAddAnimation(null)}
        style={{position:'absolute',top:0,bottom:0,left:10,right:10,
        top:0,bottom:0,justifyContent:'center'}}> 
        <AddActivity handleAddTOdocustom={AddEventHandler} handleLastAddAnimation={handleLastAddAnimation} Visible={Visible}/>
        </TouchableOpacity>: null}
    </ScrollView>
        )
    }
    const styles = StyleSheet.create({
        backgroundImage: {
            width:ovelayWidth, 
            height:height-150,
            overflow:'hidden'
          }
    })

    export default SeletedTravellingScreen;
