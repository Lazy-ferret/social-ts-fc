import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore, Action } from 'redux'
import authReducer from './authReducer'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

import appReducer from './appReducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer 
export type AppStateType = ReturnType<RootReducerType>

// type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string] : (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>> 
export type InferActionsTypes<T> = T extends {[key: string] : (...args: any[]) => infer U} ? U : never 

export type BaseThunkType<A extends Action, R = Promise<void>,> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store