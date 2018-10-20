import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducer';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/take";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store:Store<fromApp.AppState>) {}

    intercept(req:HttpRequest<any>, next:HttpHandler) {
        return this.store.select('auth')
            .take(1)
            .switchMap(
                (authState:fromAuth.State) => {
                    const copiedReq = req.clone({
                    params: req.params.set('auth', authState.token)
                })
                return next.handle(copiedReq);
            }
        )
    }
}