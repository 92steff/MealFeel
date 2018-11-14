import { Action } from "@ngrx/store";

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';
export const CLEAR_SELECTED_RES = 'CLEAR_SELECTED_RES';

export class FetchRestaurants implements Action {
    readonly type = FETCH_RESTAURANTS;

    constructor(public payload:{query:string, lat:number, lng:number, near?:string, radius:number}) {}
}

export class SetRestaurants implements Action {
    readonly type = SET_RESTAURANTS;

    constructor(public payload:string[]) {}
}

export class SelectRestaurant implements Action {
    readonly type = SELECT_RESTAURANT;

    constructor(public payload:any) {}
}

export class ClearSelectedRes implements Action {
    readonly type = CLEAR_SELECTED_RES;
}

export type RestaurantsActions = 
    FetchRestaurants |
    SetRestaurants |
    SelectRestaurant |
    ClearSelectedRes;