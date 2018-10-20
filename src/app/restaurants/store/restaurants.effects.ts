import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as RestaurantsActions from './restaurants.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class RestaurantsEffects {
    searchQuery:string;

    @Effect()
    fetchRestaurants = this.$actions
        .ofType(RestaurantsActions.FETCH_RESTAURANTS)
        .map(
            (action:RestaurantsActions.FetchRestaurants)=> {
                return action.payload;
            }
        )
        .switchMap(
            (searchData:{query:string, lat:number, lng:number, radius:number}) => {
                let latLng = searchData.lat.toString() + ',' + searchData.lng.toString();
                this.searchQuery = searchData.query;
                if (searchData.query == '') searchData.query = 'restaurant';
                return this.httpClient.get('https://api.foursquare.com/v2/venues/search?', {
                    observe: 'body',
                    responseType: 'json',
                    params: new HttpParams().set('client_id', 'CF00V4VUDHU1BQBUEOBJ1GMEKLOWTQKTGNNBS5AMKUIOLROY')
                                            .set('client_secret', '0KGHKBEEDJWDUXJOJTBNRUR0ABTD00EC4ASDFSDP3TVWBR2G')
                                            .set('v', '20180323')
                                            .set('query', searchData.query)
                                            .set('ll', latLng)
                                            .set('radius', searchData.radius.toString())
                })
            }
        )
        .switchMap(
            (places:any) => {
                const capitalize = function(str) {
                    return str.replace(/\b\w/g, l => l.toUpperCase());
                };
                let arr:any[] = [];
                let venues = places.response.venues;

                for (let place of venues) {
                    if (place.categories[0]) {
                        let placeName = place.categories[0].name;
                        let q = capitalize(this.searchQuery);
                        if (placeName.indexOf(q) !== -1) {
                            arr.push(place);
                        }
                    }
                }
                return Observable.of(arr);
            }
        )
        .map(
            (places:any) => {
                console.log(places);
                return {
                    type:RestaurantsActions.SET_RESTAURANTS,
                    payload:places
                }
            }
        )
    constructor(private $actions:Actions, private httpClient:HttpClient) {}

}