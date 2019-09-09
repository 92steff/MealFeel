import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducers';
import * as RestaurantsActions from './store/restaurants.actions';
import * as fromRestaurants from './store/restaurants.reducer';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})

export class RestaurantsComponent implements OnInit {
  @ViewChild('queryEl') queryEl:ElementRef;
  @ViewChild('areaEl') areaEl:ElementRef;
  restaurantsState:Observable<fromRestaurants.State>;
  lat:number;
  lng:number;
  radius:number = 5000;
  showMap:boolean = false;
  errMsg:boolean = false;

  constructor(private store:Store<fromApp.AppState>, private http:HttpClient) { }

  ngOnInit() {
    this.restaurantsState = this.store.select('restaurants');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.showMap = true;
      }, 
      () => {
        this.errMsg = true;
      },
      {enableHighAccuracy: true})
  }

  onToggleMap() {
   this.showMap = !this.showMap;
  }
  
  getCoords() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: new HttpParams().set('address', this.areaEl.nativeElement.value)
                              .set('key', environment.agmApi)
    })
    .subscribe(
      (response) => {
        const position = response['results'][0].geometry.location;
        this.lat = position.lat;
        this.lng = position.lng;
        this.showMap = true;
      }
    )
  }

  searchForRestaurants() {
    const queryPara = this.queryEl.nativeElement.value;
    const areaPara = this.areaEl.nativeElement.value;
    this.store.dispatch(new RestaurantsActions.FetchRestaurants({
      query: queryPara,
      lat: this.lat,
      lng: this.lng,
      near: areaPara,
      radius: this.radius
    }))
    if (areaPara.length !== 0) {
      this.getCoords();
      this.errMsg = false;
    }
    this.queryEl.nativeElement.value = null;
    this.areaEl.nativeElement.value = null;
  }
}
