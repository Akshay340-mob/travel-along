import React,{useState} from 'react'
import {View,StyleSheet,ScrollView,KeyboardAvoidingView,TouchableOpacity,AsyncStorage,Alert,Text} from 'react-native'
import {Input,Avatar,Button,CheckBox } from 'react-native-elements' 
import ImagePicker from 'react-native-image-picker'
import axios from 'axios';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';


const options = {
   title: 'Select Avatar',
   takePhotoButtonTitle: 'Take Pic from camera',
   ChooseFromLibraryButtonTitle: 'choose Pic from Gallery'
  };

const RegisterScreen=(props)=>{
    const [mchecked,setMChecked]=useState(false)
    const [fchecked,setFChecked]=useState(false)
    const[imageUri,setImageUri]=useState('https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg')
    const[error,setError] = useState({
            usernameError:{value:false,error:null},
            phoneNOError:{value:false,error:null},
            passwordError:{value:false,error:null},
            genderError:{value:false,error:null},
            generalError:{value:false,error:null}
    })
    const [user,setUser] = useState({
            username:'',phoneNo:'',password:'',name:'',gender:'',image:''
    })

     const storage = firebase.storage()


    const validation =()=>{
        return  new Promise(function(resolve, reject) {
        console.log(user)
            if(user.username.length<4)
            {
               resolve(false)  
               setError({...error,usernameError:{value:true,error:'username should have atleast 4 char'}})
            }
            if(user.phoneNo.length<10){
                resolve(false)  
                setError({...error,phoneNOError:{value:true,error:'phone-NO. should contain at least 10 digit'}})
            }
            if(user.password.length<3){
                resolve(false)  
            setError({...error,passwordError:{value:true,error:'your password not look safe'}})
            }
            if(user.gender.length<3){
             resolve(false)  
            setError({...error,genderError:{value:true,error:'Please choose a Gender'}})
            }
            if(user.username.length>3)
            {   
            var RegEx = /[^a-z\d]/i; 
            var Valid = !(RegEx.test(user.username)); 
                 if(!Valid)
                {  resolve(false)  
                    setError({...error,usernameError:{value:true,
                    error:'username should not contains any special character'}})
                 }}
                 resolve(true)  
        })
       
    }

    picImage=()=>{
        ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              if(response.uri!=null)
              {setimageUri(response.uri)}
              else 
              {
                Alert.alert(
                    'Alert Title',
                    'My Alert Msg',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}]);
              }
            }
          });
    }


      
         
       
    
    const setimageUri=(imageUri)=>
    {
        setImageUri(imageUri)
    }
   

    const updateGender=(value)=>{
        if(value==='male')
        {
            setMChecked(true)
            setUser({...user,gender:value})
            fchecked?setFChecked(false):setFChecked(fchecked)
        }
     else{
        setFChecked(true)
        setUser({...user,gender:value})
        mchecked?setMChecked(false):setMChecked(fchecked)
     }
    }    

   
    
    const onSubmitHandler= async()=>{
        //api call to backend //validate

        try{
             const valid = await validation()
        
            if(valid && imageUri.length>0)
            {
                const response = await fetch(imageUri);
                const blob = await response.blob();
            
              
              // FireBase changes
              var userYoyo = user
              var ref= storage.ref('your firebase database profile Pic ref ').child(user.username)
                  ref.put(blob).then((response)=>storage.ref('same as above').child(`${response.metadata.name}`)
                  .getDownloadURL().then( url => {
                       
                        if(url.length > 0){ 
                      
                        userYoyo = {...userYoyo,image:url}
                        }      
                    
                  }).then(()=>{
                  
                    axios.post('Your backend- rest service to save user',userYoyo).then(response => {
                        if(response.data.status === 201)
                        {
                            props.navigation.navigate('Login')
                        }
                        else
                        {setError({...error,generalError:{value:true,error:response.data.entity}})}
                    })
                    .catch(error => {
                      Alert.alert('Some error occured while saving data',[{text:'ok'}])
                    })
                  })
                ).catch(error=>  Alert.alert('Picking Image Issue!!',
                error+'You need to grant gallery permission to use this app!!',[{text:'Okay'}]))
            }
           
        }catch(error){
            console.log(error)
        }
    }
   

    const userDetailsHandler=(id,value)=>{
            if(id === "username"){
            setUser({...user,username:value})
            setError({...error,usernameError:{value:false,error:null}})
            }
            if(id === "phoneNo")
            {
                setError({...error,phoneNOError:{value:false,error:null}})
                setUser({...user,phoneNo:value})
           }
            if(id === "password")
            {
                setError({...error,passwordError:{value:false,error:null}})
             setUser({...user,password:value})}
            if(id === "name")
            setUser({...user,name:value})
            if(id === "gender")
            {
                setError({...error,genderError:{value:false,error:null}})
                updateGender(value)
            }
            
    }


    return(
     <ScrollView  style={{ flex: 1 }}>

    <View  style={styles.inputavatar} >
        <Avatar
           size="xlarge"
            rounded
            source={{uri:imageUri}}
            showEditButton
            onPress={picImage}
            activeOpacity={0.7}
           
        />   
        </View>  
        {error.generalError.value?<Text style={styles.errorStyle}>{error.generalError.error}</Text>:null}
        <View  style={styles.input}>
         <Input
            id='username'
            placeholder='username'
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            value={user.username}
            required
            onChangeText={(value)=>userDetailsHandler('username',value)}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            maxLength={16}
    
         />
         {error.usernameError.value?<Text style={styles.errorStyle}>{error.usernameError.error}</Text>:null}
        </View>

         <View  style={styles.input}>
         <Input
             placeholder='phone number'
            value={user.phoneNo}
            required
            onChangeText={(value)=>userDetailsHandler("phoneNo",value)}
            maxLength={10} 
            number
         />
         {error.phoneNOError.value?<Text style={styles.errorStyle}>{error.phoneNOError.error}</Text>:null}
         </View>

         <View  style={styles.input}>
           <Input
             placeholder='password'
            value={user.password}
            required
            onChangeText={(value)=>userDetailsHandler("password",value)}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            secureTextEntry
         />
         {error.passwordError.value?<Text style={styles.errorStyle}>{error.passwordError.error}</Text>:null}
         </View>
        
         <View  style={styles.input}>
        <Input
             placeholder='name (Optional)'
            value={user.name}
            onChangeText={(value,id)=>userDetailsHandler("name",value)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
         />
         </View>

         <View  style={styles.inputCheck}>
         <CheckBox
            center
            title='Male'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={mchecked}
            checkedTitle='male'
            onPress={()=>userDetailsHandler('gender','male')}
        />
         <CheckBox
            center
            title='Female'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={fchecked}
            checkedTitle='female'
            onPress={()=>userDetailsHandler('gender','female')}
        />
       </View>
       {error.genderError.value?<Text style={styles.errorStyle}>{error.genderError.error}</Text>:null}

         <View  style={styles.button}>
        <Button title="Sign Up" onPress={onSubmitHandler}/>
        </View>

        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>props.navigation.navigate('Login')}>
        <Text h5 style={{color:'#C2185B'}}>Already Have an Account</Text>
        </TouchableOpacity>
        </ScrollView>
      
    )
}

RegisterScreen.navigationOptions=()=>{
   return{
    headerShown: false
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    button:{
        margin:20
       
    },
    inputavatar:{
        alignSelf:'center',
        margin:20
    }, 
    input:{
        margin:10
    },
    inputCheck:{
        margin:10,
        flexDirection:'row'
    },
    errorStyle:{
        color:'red',fontSize:15,fontFamily:'open-sans-bold'
    }

})

export default RegisterScreen

