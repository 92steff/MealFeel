import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as RestaurantActions from '../store/restaurants.actions';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant;

  constructor(private router:Router, private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('restaurants')
      .subscribe(
        (state) => {
          this.restaurant = state.selectedRestaurant;
        }
      )
  }

  onBack() {
    this.store.dispatch(new RestaurantActions.ClearSelectedRes());
    this.router.navigate(['restaurants']);
  }

}
