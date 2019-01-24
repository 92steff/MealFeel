import { Action } from '@ngrx/store';

export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USERNAME = 'SET_USERNAME';
export const BOOKMARK_RECIPE = 'BOOKMARK_RECIPE';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';
export const USER_LOGOUT = 'USER_LOGOUT';

export class GetUserInfo implements Action {
    readonly type = GET_USER_INFO;
}

export class SetUserInfo implements Action {
    readonly type = SET_USER_INFO;

    constructor(public payload:{bookmarks:any[], username:string}) {}
}

export class SetUsername implements Action {
    readonly type = SET_USERNAME;

    constructor(public payload:string) {}
}

export class BookmarkRecipe implements Action {
    readonly type = BOOKMARK_RECIPE;

    constructor(public payload:any) {}
}

export class RemoveBookmark implements Action {
    readonly type = REMOVE_BOOKMARK;

    constructor(public payload:any) {}
}

export class UserLogout implements Action {
    readonly type = USER_LOGOUT;
}

export type UserActions = 
    GetUserInfo |
    SetUserInfo |
    SetUsername |
    BookmarkRecipe |
    RemoveBookmark |
    UserLogout;