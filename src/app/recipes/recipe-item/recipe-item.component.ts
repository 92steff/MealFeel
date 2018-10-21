import { Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as RecipesAction from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent {
  @Input('recipe') recipeResponse;

  constructor(private store:Store<fromApp.AppState>, private router:Router) {}

  onSelectRecipe(recipe) {
    this.store.dispatch(new RecipesAction.OpenRecipe(recipe));
    this.router.navigate(['recipes/' + recipe.recipe.label]);
  }

}