import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as RecipesActions from '../../recipes/store/recipes.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

@Injectable()
export class SidebarComponent implements OnInit {
  @ViewChild('ing') ingredient:ElementRef;
  ingArr: string[] = [];

  constructor(private store:Store<fromApp.AppState>, private router:Router) { }

  ngOnInit() {
    this.store.select('recipes');
  }

  onAddIngredient() {
    let ing = this.ingredient.nativeElement.value;
    if (ing != '') {
      this.ingArr.push(ing);
      this.ingredient.nativeElement.value = '';
    }
  }

  onDeleteIngredient(index) {
    this.ingArr.splice(index,1);
  }

  onSearchRecipes() {
    if (this.router.url !== '/recipes') {
      this.store.dispatch(new RecipesActions.SetIngredients(this.ingArr));
      this.router.navigate(['recipes']);
    } else {
      this.store.dispatch(new RecipesActions.FetchRecipes({
        ingredientsArray: this.ingArr,
        fromIndex: 0,
        toIndex: 1
      }));
    }
    
  }

}