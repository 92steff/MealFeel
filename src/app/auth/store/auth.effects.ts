import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
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
private userData;

    @Effect()
    userSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map(
            (action:AuthActions.TrySignup) => {
                return action.payload;
            }
        )
        .switchMap(
            async (authData:{email:string, password:string, username:string}) => {
                try {
                    await firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password);
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                        email: authData.email,
                        username: authData.username,
                        password: authData.password
                    });
                }
                catch (err) {
                    const reason = Observable.of(err);
                    if (err.code === 'auth/weak-password') {
                        this.authSevice.errMsg.next({ passErr: reason });
                    }
                    else {
                        this.authSevice.errMsg.next({ emailErr: reason });
                    }
                }
                this.userData = authData;
            }
        )
        .switchMap(
            () => {
                if (firebase.auth().currentUser) {
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.store.dispatch(new UserActions.SetUsername(this.userData.username))
                    return firebase.auth().currentUser.getIdToken();
                }
                else throw new Error('Something went wrong! :(');
            }
        )
        .mergeMap(
            (token:string) => {
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
                async (authData:{email:string, password:string}) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(authData.email, authData.password);
                    }
                    catch (err) {
                        const reason = Observable.of(err);
                        if (err.code === 'auth/wrong-password') {
                            this.authSevice.errMsg.next({ passErr: reason });
                        }
                        else {
                            this.authSevice.errMsg.next({ emailErr: reason });
                        }
                        throw new Error(err);
                    }
                    this.userData = authData;
                }
            )
            .switchMap(
                () => {
                    if (firebase.auth().currentUser) {
                        this.store.dispatch(new UserActions.GetUserInfo());
                        localStorage.setItem('user', JSON.stringify(this.userData));
                        return firebase.auth().currentUser.getIdToken();
                    }
                    else throw new Error('Something went wrong! :(');
                }
            )
            .mergeMap(
                (token:string) => {
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
            )

        @Effect()
        userLogout = this.actions$
            .ofType(AuthActions.LOGOUT)
            .map(
                () => {
                    firebase.auth().signOut();
                    localStorage.removeItem('user');
                    this.router.navigate(['/']);
                }
            )
            .map(
                () => {
                    return {
                        type: UserActions.USER_LOGOUT
                    }
                }
            )

    constructor(private actions$:Actions,
                private authSevice:AuthService,
                private router:Router,
                private store:Store<fromApp.AppState>) {}
}

