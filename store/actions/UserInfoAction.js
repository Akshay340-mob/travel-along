import UserDetailServices from '../../services/UserDetailServices'
export const user_Intrests='user_Intrests'

export const UserInfoAction=(username)=>{
    return async (dispatch)=>{  
try{   
    const response =await UserDetailServices.getUserDetail(username)
    if(response.data!=null){
        dispatch({type:user_Intrests,payload:{username:response.data.username,intrests:response.data.userIntrests}})
    } 
    return response.data   
 }
catch(error){
        console.log(error)
   }
 }
 
}