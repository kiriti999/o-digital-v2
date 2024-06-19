import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  email: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      return state;
    },
    setLogout: (state: AuthState) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.token = null;
      return state;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
