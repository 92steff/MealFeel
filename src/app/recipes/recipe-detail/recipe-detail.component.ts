import { Component, OnInit, Injectable, OnDestroy, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import * as fromAuth from '../../auth/store/auth.reducer';
import * as UserActions from '../../user/store/user.actions';
import * as fromRecipe from '../store/recipes.reducer';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../user/store/user.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

@Injectable()
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeContent;
  subscription:Subscription;
  subscription1:Subscription;
  subscription2:Subscription;
  isAuthenticated;

  @ViewChild('favorite') favoriteEl:HTMLDivElement;
  @ViewChild('star') starEl:HTMLSpanElement;

  constructor(private store:Store<fromApp.AppState>, private router:Router) { }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .subscribe(
        (recipeState:fromRecipe.State) => {
          this.recipeContent = recipeState.selectedRecipe;
        }
      )

    this.subscription1 = this.store.select('auth')
      .subscribe(
        (authState:fromAuth.State) => {
          this.isAuthenticated = authState.authenticated;    
        }
      )

    this.subscription2 = this.store.select('user')
        .subscribe(
          (userState:fromUser.State) => {
            for (let bkm of userState.bookmarks) {
              if (bkm.recipe.label === this.recipeContent.recipe.label) {
                this.recipeContent.bookmarked = true;
              }
            }
          }
        )
  }

  onBookmarkRecipe() {
    if (this.isAuthenticated) {
      this.recipeContent.bookmarked = !this.recipeContent.bookmarked;
      if (this.recipeContent.bookmarked === true) {
        this.store.dispatch(new UserActions.BookmarkRecipe(this.recipeContent));
      }
      else {
        this.store.dispatch(new UserActions.RemoveBookmark(this.recipeContent));
      }
      
    }
    else {
      this.router.navigate(['sign-in']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
