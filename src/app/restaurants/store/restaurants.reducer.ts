import * as RestaurantsActions from './restaurants.actions';

export interface State {
    restaurants:any[]
    showRestaurants:boolean,
    selectedRestaurant:any;
}

const initialState:State = {
    restaurants: [],
    showRestaurants:false,
    selectedRestaurant: null
}

export function RestaurantsReducer(state=initialState, action:RestaurantsActions.RestaurantsActions) {
    switch(action.type) {
        case RestaurantsActions.SET_RESTAURANTS:
            return {
                ...state,
                restaurants:action.payload,
                showRestaurants: true
            };
        case RestaurantsActions.SELECT_RESTAURANT:
            return {
                ...state,
                selectedRestaurant: action.payload
            };
        case RestaurantsActions.CLEAR_SELECTED_RES:
            return {
                ...state,
                selectedRestaurant: null
            }
        default: return state
    }
}
