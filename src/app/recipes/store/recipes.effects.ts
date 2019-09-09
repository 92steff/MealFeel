import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
                let ingredients = reqData.ingredientsArray.join(',')
                return this.httpClient.get('https://api.edamam.com/search?', {
                    observe: 'body',
                    responseType: 'json',
                    params: new HttpParams().set('q', ingredients)
                                            .set('app_id', environment.edamam.appID)
                                            .set('app_key', environment.edamam.appKey)
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