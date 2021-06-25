import { ADD_DISH, DECREASE_DISH } from "../action/cart";

const initialState = {
    chefId:null,
    cartObject:{},
    cartTotal:0,
    cartAmount:0
}

class CartModel {
    constructor(id, name, price,  category, catid, image, quantity, mrp){
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.catid = catid;
        this.image = image;
        this.quantity = quantity
        this.mrp = mrp
    }
}

export default (state = initialState, action) => {

    switch(action.type){

        case ADD_DISH:
            const item = action.item 
            let updatedProduct

            if(Boolean(state.cartObject[item.id])){
                console.log("price", state.cartObject[item.id].price)
                //updatedProduct = new CartModel(action.wt.concat(item.id), state.list[action.wt.concat(item.id)].name, (parseFloat(state.list[action.wt.concat(item.id)].price) + parseFloat(action.price)).toFixed(2), action.wt, item.description, item.category,item.catId,item.image,parseInt(state.list[action.wt.concat(item.id)].quantity) +1, action.price)
                updatedProduct = new CartModel(item.id, item.name, (parseFloat(item.price) + parseFloat(state.cartObject[item.id].price)).toFixed(2), item.categoryName,item.categoryId, item.imguri,parseInt(state.cartObject[item.id].quantity)+1, parseFloat(item.price))
                return{
                    ...state,
                    cartObject:{...state.cartObject,[item.id]:updatedProduct},
                    cartTotal:parseInt(state.cartTotal) + 1,
                    cartAmount:(parseFloat(state.cartAmount) + parseFloat(item.price)).toFixed(2)
                }
            }else{

                updatedProduct = new CartModel(item.id, item.name, parseFloat(item.price).toFixed(2), item.categoryName,item.categoryId, item.imguri,1, parseFloat(item.price))
                return{
                    ...state,
                    cartObject:{...state.cartObject,[item.id]:updatedProduct},
                    cartTotal:parseInt(state.cartTotal) + 1,
                    cartAmount:(parseFloat(state.cartAmount) + parseFloat(item.price)).toFixed(2)
                }

            }
            
        case DECREASE_DISH:

            const decreaseItem = action.item 
            let decreaseProduct

            if(state.cartObject[decreaseItem.id].quantity > 1){
                decreaseProduct = new CartModel(decreaseItem.id, decreaseItem.name, (parseFloat(state.cartObject[decreaseItem.id].price) - parseFloat(decreaseItem.price)).toFixed(2), decreaseItem.categoryName,decreaseItem.categoryId, decreaseItem.imguri,parseInt(state.cartObject[decreaseItem.id].quantity)- 1, parseFloat(decreaseItem.price))                
                return{
                    ...state,
                    cartObject:{...state.cartObject,[decreaseItem.id]:decreaseProduct},
                    cartTotal:parseInt(state.cartTotal) - 1,
                    cartAmount:(parseFloat(state.cartAmount) - parseFloat(decreaseItem.price)).toFixed(2)
                }
            }else{
                deleteItem = {...state.cartObject}
                delete deleteItem[decreaseItem.id]
                console.log("Remove Item :", deleteItem)
                return{
                    cartObject:deleteItem,
                    cartTotal:parseInt(state.cartTotal) - 1,
                    cartAmount:(parseFloat(state.cartAmount) - parseFloat(decreaseItem.price)).toFixed(2)
                }


            }
        
        default:
            return state


    }

}