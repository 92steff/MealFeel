import { Action } from '@ngrx/store';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';
export const OPEN_RECIPE = 'OPEN_RECIPE';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;

    constructor(public payload:{ingredientsArray:string[],fromIndex:number,toIndex:number}) {}
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload:any[]) {}
}

export class OpenRecipe implements Action {
    readonly type = OPEN_RECIPE;

    constructor(public payload:{}) {}
}

export class SetIngredients implements Action {
    readonly type = SET_INGREDIENTS;

    constructor(public payload:string[]) {}
}

export type RecipesActions = 
    FetchRecipes | 
    SetRecipes | 
    OpenRecipe |
    SetIngredients;