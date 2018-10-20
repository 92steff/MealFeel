import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../store/app.reducers';
import * as RestaurantsActions from './store/restaurants.actions';
import * as fromRestaurants from './store/restaurants.reducer';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})

export class RestaurantsComponent implements OnInit {
  @ViewChild('queryEl') queryElement:ElementRef;
  restaurantsState:Observable<fromRestaurants.State>;
  lat:number;
  lng:number;
  radius:number = 3000;
  showMap:boolean = true;
  query:string;

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.restaurantsState = this.store.select('restaurants');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, 
      () => {},
      {enableHighAccuracy: true})
  }

  onToggleMap() {
   this.showMap = !this.showMap;
  }
  
  searchForRestaurants() {
    this.store.dispatch(new RestaurantsActions.FetchRestaurants({
      query: this.queryElement.nativeElement.value,
      lat: this.lat,
      lng: this.lng,
      radius: this.radius
    }))
    this.queryElement.nativeElement.value = null;
  }
}
