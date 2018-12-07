import * as UserActions from "./user.actions";

export interface State {
    username:string,
    bookmarks: any[]
}

const initialState: State = {
    username:null,
    bookmarks:[]
}

export function UserReducer(state=initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.SET_USER_INFO:
            return {
                ...state,
                username: action.payload.username,
                bookmarks: [...action.payload.bookmarks]
            };
        case UserActions.BOOKMARK_RECIPE:
            const newBookmarks = [...state.bookmarks];
            newBookmarks.push(action.payload);
            return {
                ...state,
                bookmarks: newBookmarks
            };
        case UserActions.SET_USERNAME:
            return {
                ...state,
                username:action.payload
            };
        case UserActions.REMOVE_BOOKMARK:
            const splicedBookmarks = [...state.bookmarks];
            for (let i=0; i < splicedBookmarks.length; i++) {
                if (action.payload.recipe.label === splicedBookmarks[i].recipe.label) {
                    splicedBookmarks.splice(i,1);
                }
            };
            return {
                ...state,
                bookmarks: splicedBookmarks
            };
        case UserActions.USER_LOGOUT:
            return {
                ...state,
                username: null,
                bookmarks: []
            };
        default: return state;
    }
}