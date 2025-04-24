
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import storage from 'redux-persist/lib/storage';


import {
  persistReducer,
  persistStore,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER
} from 'redux-persist'
import languageReducer from './reducers/language'
import authReducer from './reducers/auth'
import orderReducer from './reducers/orders'
import productReducer from './reducers/products'

const asyncPersistConfig = {
  key: 'main',
  storage
}

const persistedLangReducer = persistReducer(asyncPersistConfig, languageReducer)
const persistedAuthReducer = persistReducer(asyncPersistConfig, authReducer)

const reducers = combineReducers({
  language: persistedLangReducer,
  auth: persistedAuthReducer,
  order: orderReducer,
  product: productReducer
})


const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})

export const persistor = persistStore(store)
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;