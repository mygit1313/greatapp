"use client";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reduxReducer from '../reducer'

export const store = createStore(reduxReducer, applyMiddleware(thunk, logger))