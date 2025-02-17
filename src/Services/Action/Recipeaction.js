import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const addNewRecipe=()=>{
   return{
    type:"ADD_NEW_RECIPE"
   }
}

export const addRecipeRej = (msg) => {
    return {
        type: "ADD_NEW_RECIPE_REJ",
        payload: msg
    }
}

export const getAllRecipe=(data)=>{
    return{
        type:'GET_ALL_RECIPES',
        payload:data
    }
}

export const updateRecipe=()=>{
    return{
        type:'UPDATE_RECIPE'
    }
}

export const singleRecipe=(data)=>{
    return{
        type:"SINGLE_RECIPE",
        payload:data
    }
}
export const addRecipeAsync =(data)=>{
  return async(dispatch)=>{
      try{
          await setDoc(doc(db,'recipes',`${data.id}`),data)
          console.log('Book added successfully');
          dispatch(addNewRecipe())
      }
      catch(err){
          console.log(err)
      }
  }
}

export const getAllRecipesAsync=()=>{
    return async(dispatch)=>{
        try {
            let books=await getDocs(collection(db,"recipes"))
            let result=books.docs.map((book)=>{
                return{
                    id:book.id,
                    ...book.data()
                }
            })
            dispatch(getAllRecipe(result))
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteRecipeAsync=(id)=>{
   return async(dispatch)=>{
    try {
        await deleteDoc(doc(db,"recipes",`${id}`))
        dispatch(getAllRecipesAsync())
    } catch (error) {
        console.log(error)
    }
   }
}


export const updateRecipeAsync=(data)=>{
   return async(dispatch)=>{
      try {
         await updateDoc(doc(db,"recipes",`${data.id}`),data)
         dispatch(updateRecipe())
      } catch (error) {
        console.log(error)
      }
   }
}

export const singleRecipeAsync=(id)=>{
    return async(dispatch)=>{
       try {
        let res=await getDoc(doc(db,'recipes',`${id}`))
        let result=res.data();
        result.id=res.id;
        dispatch(singleRecipe(result))
        
       } catch (error) {
        console.log(error)
       }
    }
}

