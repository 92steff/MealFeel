import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as authActions from './auth/store/auth.actions';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  user;
  constructor(private store:Store<fromApp.AppState>) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA2MTm9pX0xB3v--VCG04cKOnYV1FTwmag",
      authDomain: "mealfeel-a2e12.firebaseapp.com",
      databaseURL: "https://mealfeel-a2e12.firebaseio.com",
      projectId: "mealfeel-a2e12",
      storageBucket: "mealfeel-a2e12.appspot.com",
      messagingSenderId: "1093628792958"
    })
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.store.dispatch(new authActions.TrySignin(this.user));
    }
  }

}
