import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as UserActions from './user.actions';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserEffects {
    username:string;
    recipe;

    @Effect()
    getUserInfo = this.actions$
        .ofType(UserActions.GET_USER_INFO)
        .switchMap(
            () => {
                const db = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/username');
                const username = db.once('value').then((snapshot) => {
                    return snapshot.val();
                })
                return username;
            }
        )
        .switchMap(
            (username) => {                
                this.username = username;
                const db = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/bookmarks');
                const bms = db.once('value').then((snapshot) => {
                    if (snapshot.val()) return snapshot.val()
                    else return [];
                })
                return bms;
            }
        )
        .map(
            (bookmarks) => {
                let bookmarksArr = bookmarks;
                if (bookmarks.lenght != 0) {
                    bookmarksArr = Object.values(bookmarks);
                }
                return {
                    type: UserActions.SET_USER_INFO,
                    payload: {bookmarks: bookmarksArr, username: this.username}
                }
            }
        )

    @Effect({dispatch:false})
    bookmarkRecipe = this.actions$
        .ofType(UserActions.BOOKMARK_RECIPE)
        .map(
            (action:UserActions.BookmarkRecipe) => {
                return action.payload
            }
        )
        .switchMap(
            (recipe) => {
                const user = firebase.auth().currentUser;
                if (user) {
                    return firebase.database().ref('users/' + user.uid + '/bookmarks')
                        .push(recipe);
                }
                else {
                    this.router.navigate(['/sign-up']);
                }  
            }
        )

    @Effect({dispatch:false})
    removeBookmark = this.actions$
        .ofType(UserActions.REMOVE_BOOKMARK)
        .map(
            (action:UserActions.RemoveBookmark) => {
                return action.payload;
            }
        )
        .switchMap(
            (recipe) => {
                const db = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/bookmarks');
                return db.once('value').then(
                    (snapshot) => {
                        for (let bookmark in snapshot.val()) {
                            if (recipe.recipe.label == snapshot.val()[bookmark].recipe.label) {
                                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/bookmarks/' + bookmark).remove()
                            }
                        }
                    }
                )
            }
        )

    constructor(private actions$:Actions, private router:Router) {}
}