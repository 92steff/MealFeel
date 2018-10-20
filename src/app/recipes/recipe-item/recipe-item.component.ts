import { Component, OnInit, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipes.reducer';
import * as RecipesAction from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipeResponse;
  recipesState:Observable<fromRecipe.State>;

  constructor(private store:Store<fromApp.AppState>, private router:Router) {}

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onSelectRecipe(recipe) {
    this.store.dispatch(new RecipesAction.OpenRecipe(recipe));
    this.router.navigate(['recipes/' + recipe.recipe.label]);
  }

}