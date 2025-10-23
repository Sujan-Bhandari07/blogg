import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for existing auth state
const getInitialAuthState = () => {
  const storedAuth = localStorage.getItem('isauth');
  return storedAuth === 'true';
};

const initialState = {
 isauth: getInitialAuthState()
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser: (state, action) => {
      if(action.payload.success === true){
        localStorage.setItem('isauth', 'true');
        state.isauth = true;
        // Persist auth state to localStorage
      }
    },
    logout: (state) => {
      localStorage.removeItem('isauth');
      state.isauth = false;
      // Clear auth state from localStorage
    },
  },
});

export const { setuser, logout } = userSlice.actions;
export default userSlice.reducer;
