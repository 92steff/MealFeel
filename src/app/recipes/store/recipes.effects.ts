import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as RecipesActions from './recipes.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$
        .ofType(RecipesActions.FETCH_RECIPES)
        .map(
            (action:RecipesActions.FetchRecipes) => {
                return action.payload
            }
        )
        .switchMap(
            (reqData:{ingredientsArray:string[], fromIndex:number, toIndex:number}) => {
                console.log('logg: heeeey');
                let ingredients = reqData.ingredientsArray.join(',')
                return this.httpClient.get('https://api.edamam.com/search?', {
                    observe: 'body',
                    responseType: 'json',
                    params: new HttpParams().set('q', ingredients)
                                            .set('app_id', 'daa673ca')
                                            .set('app_key', '608b42477eef1e0eea7e7d6087e8c6ea')
                                            .set('from', reqData.fromIndex.toString())
                                            .set('to', reqData.toIndex.toString()),
                    headers: new HttpHeaders().set('Content-Type', 'text/json')
                                              .set('X-Content-Type-Options', 'nosniff')
                })
            }
        )
        .map( 
            (recipes:any) => {
                return {
                    type: RecipesActions.SET_RECIPES,
                    payload: recipes.hits
                }
            }
        )

    constructor(private actions$:Actions, private httpClient:HttpClient) {}
}