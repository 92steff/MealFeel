import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store:Store<fromApp.AppState>, private router:Router) {}

    canActivate():Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth')
            .take(1)
            .map(
                (authState:fromAuth.State) => {
                    if (authState.authenticated) return true;
                    else {
                        this.router.navigate(['sign-in'])
                    }
                }
            )
    }
}