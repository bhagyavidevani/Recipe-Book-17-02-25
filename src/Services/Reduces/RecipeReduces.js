
const initialState={
  recipes:JSON.parse(localStorage.getItem("recipes")) || [],
  recipe:null,
  isCreated:false,
  error:null,
  isUpdated:false
}


export const RecipeReduces =( state=initialState, action)=>{
   switch (action.type) {
    case "ADD_NEW_RECIPE":
        return{
            ...state,
            isCreated: true
        }
    case "GET_ALL_RECIPES":
      return{
        ...state,
        recipes:action.payload,
        isCreated:false,
        isUpdated: false
      }
    case "ADD_NEW_RECIPE_REJ": 
    return {
        ...state,
        error: action.payload
    }  
    case "UPDATE_RECIPE":
      return{
        ...state,
        isUpdated:true,
        recipe:null
      }
    case "SINGLE_RECIPE":
      return{
        ...state,
        recipe:action.payload
      }
    default:
      return state;
   }
}
