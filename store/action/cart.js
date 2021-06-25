export const ADD_DISH = "ADD_DISH"
export const DECREASE_DISH = "DECREASE_DISH"

export const addDish = (item) => {

    return async (dispatch, getState) => {

        console.log("Added Dish", item)
        dispatch({type:ADD_DISH, item:item})

    }

}

export const decreaseDish = (item) => {

    return async (dispatch, getState) => {

        console.log("Decrease DISH", item)
        dispatch({type:DECREASE_DISH, item:item})

    }

}