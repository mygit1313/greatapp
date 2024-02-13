'use client'

import { combineReducers } from 'redux'
import auth from './auth'
import admin from './admin'
import frontend from './frontend'

export default combineReducers({
	auth:auth,
	admin:admin,
	frontend:frontend
})
