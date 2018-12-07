import { Component, OnInit, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipes.reducer';
import * as RecipesAction from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

@Injectable()
export class RecipeListComponent implements OnInit {
  recipesState:Observable<fromRecipe.State>;
  queryIndexFrom:number = 0;
  queryIndexTo:number = 8;
  numOfDisplays:number = 8;
  dummyIngredients = ['chicken', 'ice-cream', 'potato', 'sandwich', 'tomato', 'salad'];
  choosenIngredients:string[] = [];
  isInRecipes:boolean;

  constructor(private store:Store<fromApp.AppState>, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.snapshot.component == RecipeListComponent ? this.isInRecipes = true : this.isInRecipes = false;
    this.recipesState = this.store.select('recipes');
    this.store.select('recipes')
      .subscribe(
        (state) => {
          this.choosenIngredients = state.ingredients;
        }
      )
    // this.onSearchRecipes();
  }

  onTurnPage(dir) {
    if (dir === 'next') {
      this.queryIndexFrom += this.numOfDisplays;
      this.queryIndexTo += this.numOfDisplays;
    }
    else {
      this.queryIndexTo -= this.numOfDisplays;
      this.queryIndexFrom -= this.numOfDisplays;
    }
    this.onSearchRecipes();
  }

  onSearchRecipes() {
    this.store.dispatch(new RecipesAction.FetchRecipes({
      ingredientsArray: this.choosenIngredients.length > 0 ? this.choosenIngredients : [this.randomSearch()],
      fromIndex: this.queryIndexFrom,
      toIndex: this.queryIndexTo
    }))
  }

  randomSearch() {
    let randomNum = Math.floor((Math.random() * this.dummyIngredients.length));
    return this.dummyIngredients[randomNum];
  }

}
