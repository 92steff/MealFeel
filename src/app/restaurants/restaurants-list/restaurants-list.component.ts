import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromRestaurants from '../store/restaurants.reducer';
import * as RestaurantActions from '../store/restaurants.actions';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})

export class RestaurantsListComponent implements OnInit {
  restaurantsState: Observable<fromRestaurants.State>;

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.restaurantsState = this.store.select('restaurants');
  }

  onSelectRestaurant(res) {
    this.store.dispatch(new RestaurantActions.SelectRestaurant(res));
  }

}
