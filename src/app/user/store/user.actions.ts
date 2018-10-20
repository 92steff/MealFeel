import { Action } from '@ngrx/store';

export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const BOOKMARK_RECIPE = 'BOOKMARK_RECIPE';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export class GetUserInfo implements Action {
    readonly type = GET_USER_INFO;
}

export class SetUserInfo implements Action {
    readonly type = SET_USER_INFO;

    constructor(public payload:{bookmarks:any[], username:string}) {}
}

export class BookmarkRecipe implements Action {
    readonly type = BOOKMARK_RECIPE;

    constructor(public payload:any) {}
}

export class RemoveBookmark implements Action {
    readonly type = REMOVE_BOOKMARK;

    constructor(public payload:any) {}
}

export type UserActions = 
    GetUserInfo |
    SetUserInfo |
    BookmarkRecipe |
    RemoveBookmark;