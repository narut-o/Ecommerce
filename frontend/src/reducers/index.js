import {combineReducers} from "redux"
import cartReducer from "./cartReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import newReviewReducer from "./newReviewReducer";
import orderDetailsReducer from "./orderDetailsReducer";
import myOrdersReducer from "./orderReducer";

import productDetailsReducer from "./productDetailsReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";

export default combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer
});

