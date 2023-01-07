import { CLEAR_ERROR, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS } from "../constants/productConstants";



const newReviewReducer = (state={},action)=>{
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading:true
            }
        case NEW_REVIEW_SUCCESS:
            return{
              loading:false,
              success:action.payload
                
            }
        case NEW_REVIEW_RESET:
            return{
                ...state,
                success:false,
            }
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
            
           
    
        default:
           return state;
    }

}
export default newReviewReducer;