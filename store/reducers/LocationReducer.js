
const initialState={
    location:null,
    userLocation:null
};

export default LocationReducer=(state=initialState,action)=>{
     if(action.type === 'LOCATION') 
     {
        return{...state,
            location:action.payload
         }
     }
     if(action.type === 'userLocation')
     {
         return{...state,
            userLocation:action.payload
         }
     }
     return state
 }
