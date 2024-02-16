import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  // after registering the data sent in the register form using regster endpoint mutation, we want to store the data in localstorage so once the user logs out and the session cookie is destroyed(done for better security prone to online CSRf and XSS attacks) we store it locally in browser so the user can easily log in the next time they visit the site
  reducers: {
    // The setCredentials reducer updates the Redux store with user information received after successful registration.
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("Expiration Time", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
