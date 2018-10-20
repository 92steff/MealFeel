import * as RecipesActions from './recipes.actions';

export interface State {
    recipes:any[],
    ingredients:string[],
    selectedRecipe:{}
}

const initialState:State = {
    recipes:[],
    ingredients:[],
    selectedRecipe:{}
}

export function RecipesReducer(state=initialState, action:RecipesActions.RecipesActions) {
    switch(action.type) {
        case RecipesActions.SET_RECIPES:
        return {
            ...state,
            recipes: [...action.payload]
        };
        case RecipesActions.OPEN_RECIPE:
        return {
            ...state,
            selectedRecipe:action.payload
        };
        case RecipesActions.SET_INGREDIENTS:
        return {
            ...state,
            ingredients:action.payload
        }
        default: return state;
    }
}