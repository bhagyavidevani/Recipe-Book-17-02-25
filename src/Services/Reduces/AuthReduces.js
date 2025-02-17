const initialState={
  error:null,
  isCreated:false,
  user: JSON.parse(sessionStorage.getItem('user')) || null
}

export const AuthReduces=(state=initialState,action)=>{
   
  switch (action.type) {
    case "SIGNUP_REJ":
      return{
         ...state,
         error:action.payload
      }
      
    case "SIGNUP_SUC":
      console.log("value ischanging from this..");
      
      return{
        ...state,
        isCreated:true
      }  
    case "LOGIN_SUC":
      // console.log("value ischanging from this..");
      sessionStorage.setItem('user', JSON.stringify(action.payload));
      return{
        ...state,
        isCreated:false,
        user: action.payload
      }  
      case "LOGIN_FAIL" : 
      return {
          ...state,
          error: action.payload
      }  
    case "LOGOUT_SUC":
      // console.log("value ischanging from this..");
      sessionStorage.removeItem('user');
      return{
        ...state,
        isCreated:false,
        user: null
      }  
    default:
      return state;
  }

}