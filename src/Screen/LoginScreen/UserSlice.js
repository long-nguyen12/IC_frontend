import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    name: '',
    email:'',
    // savUrl: '',
    // role: '',
  },
  reducers: {
    UserUpdate: (state, action) =>{
        console.log("dasdasd",action)

        state.name = action.payload.user.userName;
        state.email = action.payload.user.email;
    //   state.savUrl = action.payload.savUrl;
    //   state.role = action.payload.role;
      return state
    },
    
    ClearUser: (state, action) => {
      state.status = action.payload;
    }
  },
});

export const {UserUpdate,ClearUser } = userSlice.actions;

export default userSlice.reducer;


