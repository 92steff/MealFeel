import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.store.dispatch(new RecipesAction.FetchRecipes({
    //   ingredientsArray: ['chicken'],
    //   fromIndex: 0,
    //   toIndex:1
    // }));
  }
}
