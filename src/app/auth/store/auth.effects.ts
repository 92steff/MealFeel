import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from './auth.actions';
import * as UserActions from '../../user/store/user.actions';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthEffects {

    @Effect()
    userSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map(
            (action:AuthActions.TrySignup) => {
                return action.payload;
            }
        )
        .switchMap(
            (authData:{email:string, password:string, username:string}) => {
                return firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
                .then(
                    () => {
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                            email: authData.email,
                            username: authData.username,
                            password: authData.password
                        })        
                        localStorage.setItem('user', JSON.stringify(authData));
                    },
                    (err) => {
                        const reason = Observable.of(err);
                        if (err.code === 'auth/weak-password') {
                            this.authSevice.errMsg.next({passErr:reason});
                        }   
                        else {
                            this.authSevice.errMsg.next({emailErr:reason});
                        }
                    }
                );
            }
        )
        .switchMap(
            () => {
                if (firebase.auth().currentUser) {
                    return firebase.auth().currentUser.getIdToken();
                }
                else return Object;
            }
        )
        .mergeMap(
            (token:string) => {
                if (token) {
                    this.router.navigate(['/']);
                    return [
                        {
                            type: AuthActions.USER_SIGNIN
                        },
                        {
                            type: AuthActions.SET_TOKEN,
                            payload: token
                        }
                    ] 
                } 
                else {
                    return [ 
                        {
                            type: AuthActions.INVALID_TRY
                        }
                    ]
                }
            } 
        )

        @Effect()
        userSignin = this.actions$
            .ofType(AuthActions.TRY_SIGNIN)
            .map(
                (action:AuthActions.TrySignin) => {
                    return action.payload;
                }
            )
            .switchMap(
                (authData:{email:string, password:string}) => {
                    return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
                    .then( 
                        () => {
                            localStorage.setItem('user', JSON.stringify(authData));
                        },
                        (err) => {
                            const reason = Observable.of(err);
                            if (err.code === 'auth/wrong-password') {
                                this.authSevice.errMsg.next({passErr:reason});
                            }
                            else {
                                this.authSevice.errMsg.next({emailErr:reason});
                            }
                        }
                    ))
                }
            )
            .switchMap(
                () => {
                    if (firebase.auth().currentUser) {
                        this.store.dispatch(new UserActions.GetUserInfo());
                        return firebase.auth().currentUser.getIdToken();
                    }
                    else return Object;
                }
            )
            .mergeMap(
                (token:string) => {
                    if (token) {        
                        this.router.navigate(['/']);
                        return [
                            {
                                type: AuthActions.USER_SIGNIN
                            },
                            {
                                type: AuthActions.SET_TOKEN,
                                payload: token
                            }
                        ]
                    }
                    else {
                        return [ 
                            {
                                type: AuthActions.INVALID_TRY
                            }
                        ]
                    }
                } 
            )

        @Effect({dispatch:false})
        userLogout = this.actions$
            .ofType(AuthActions.LOGOUT)
            .do(
                () => {
                    firebase.auth().signOut();
                    localStorage.removeItem('user');
                    this.router.navigate(['/']);
                }
            )

    constructor(private actions$:Actions,
                private authSevice:AuthService,
                private router:Router,
                private store:Store<fromApp.AppState>) {}
}

