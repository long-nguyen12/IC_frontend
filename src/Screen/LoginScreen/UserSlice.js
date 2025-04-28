import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    name: '',
    email:'',
    isAuthenticated: false,
    userRole: null,
    // savUrl: '',
    role: [],
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null;
    },

    UserUpdate: (state, action) =>{
        state.token = action.payload.token;
        state.name = action.payload.user.userName;
        state.email = action.payload.user.email;
        state.role = action.payload.user.role
      return state
    },
    
    ClearUser: (state, action) => {
      state.status = action.payload;
    }
  },
});

export const {UserUpdate,ClearUser,logout } = userSlice.actions;

export default userSlice.reducer;


