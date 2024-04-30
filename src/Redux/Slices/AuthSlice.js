import { createSlice } from '@reduxjs/toolkit';
import Common from '../../Utils/Common';

const initialState = {
  isAuth: {},
  users: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      const hasUser = state.users?.find((user)=>user.email===action.payload.email && user.password===action.payload.password)
      let isAuth = {}
      if(hasUser){
        isAuth = {
          ...hasUser,
          token: Common.generateToken()
        }
      }
      state.isAuth = isAuth
    },
    authLogout: (state) => {
        state.isAuth = null
    },
    authRegisterUser: (state, action) => {
      state.users.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { authLogin, authLogout, authRegisterUser } = authSlice.actions

export default authSlice.reducer