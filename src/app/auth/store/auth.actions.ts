import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const USER_SIGNIN = 'USER_SIGNIN';
export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';
export const INVALID_TRY = 'INVALID_TRY';

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload:{email:string, password:string, username:string}) {}
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload:{email:string, password:string}) {}
}

export class UserSignin implements Action {
    readonly type = USER_SIGNIN;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload:string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class InvalidTry implements Action {
    readonly type = INVALID_TRY;
}

export type AuthActions = 
    TrySignup | 
    UserSignin | 
    TrySignin | 
    SetToken | 
    Logout | 
    InvalidTry;