import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { GoogleLoginResponse } from "react-google-login";

interface GoogleUser {
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
  token: {
    access_token: string;
    id_token: string;
    login_hint: string;
    scope: string;
    expires_in: number;
    first_issued_at: number;
    expires_at: number;
  };
}

type MaybeGoogleUser = GoogleUser | null;

/**
 * Convert the unserializable response from Google OAuth2 into a serializable
 * user object so that it can be put in the redux store.
 * @param {GoogleLoginResponse} response the response from Google OAuth2 login
 * @returns {MaybeGoogleUser} the serializable user
 */
const convertGoogleLoginResponseToUser = (response: GoogleLoginResponse) => {
  const profile = response.getBasicProfile();

  // Note: profile.ID is not meant to be sent to the back-end.
  // Use token ID instead.
  return {
    token: response.getAuthResponse(),
    email: profile.getEmail(),
    name: profile.getName(),
    givenName: profile.getGivenName(),
    familyName: profile.getFamilyName(),
    imageUrl: profile.getImageUrl(),
  };
};

/**
 * Reducers for handling user state such as authentication.
 */
export const userSlice = createSlice({
  initialState: {
    googleUser: null as MaybeGoogleUser,
  },
  name: "user",
  reducers: {
    setGoogleUser(
      state,
      action: PayloadAction<{ loginResponse: GoogleLoginResponse | null }>
    ) {
      state.googleUser =
        action.payload.loginResponse === null
          ? null
          : convertGoogleLoginResponseToUser(action.payload.loginResponse);

      return state;
    },
  },
});

export const getGoogleUser = (state: RootState) => state.user.googleUser;
