import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import * as fromAuth from '../auth/store/auth.reducer'
import * as fromRestaurants from '../restaurants/store/restaurants.reducer';
import * as fromUser from '../user/store/user.reducer';

export interface AppState {
    recipes: fromRecipes.State,
    auth: fromAuth.State,
    restaurants: fromRestaurants.State,
    user: fromUser.State
}

export const reducers:ActionReducerMap<AppState> = {
    recipes: fromRecipes.RecipesReducer,
    auth: fromAuth.AuthReducer,
    restaurants: fromRestaurants.RestaurantsReducer,
    user: fromUser.UserReducer
}