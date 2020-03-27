
const initialState={
    username:'',
    userIntrests:[]
};

import {user_Intrests} from '../actions/UserInfoAction'


export default UserInfoReducer=(state= initialState,action)=>
{
    switch(action.type){
        case user_Intrests:
        return {...state,
            username:action.payload.username,
            userIntrests:action.payload.intrests
        }
    }
    return state;
}