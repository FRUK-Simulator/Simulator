import { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSlice, getGoogleUser } from "../../../User/userSlice";
import {
  useGoogleLogin,
  useGoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react/lib/Persona";
import {
  CommandButton,
  CommandBarButton,
  IContextualMenuProps,
} from "office-ui-fabric-react";
import { FaGoogle } from "react-icons/fa";

import "./UserControls.css";

const GOOGLE_OAUTH_CLIENT_ID =
  "706424939595-u8viflhr7gq9qlnspmufe9fc6rgia4s9.apps.googleusercontent.com";

export const UserControls: FunctionComponent = () => {
  const user = useSelector(getGoogleUser);

  const dispatch = useDispatch();

  const onGoogleSignInSuccess = (
    loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (loginResponse.hasOwnProperty("code")) {
      // TODO handle refreshing of auth tokens:
      // "Use offline with responseType 'code' to retrieve
      // an authorization code for fetching a refresh token"
      console.error(
        "User was logged in but an 'offine' response was received." +
          "Not currently supported.",
      );
      return;
    }

    const onlineResponse = loginResponse as GoogleLoginResponse;

    console.log("User logged in: ", onlineResponse.getBasicProfile().getName());

    dispatch(
      userSlice.actions.setGoogleUser({ loginResponse: onlineResponse }),
    );
  };

  const onGoogleSignInFailure = (response: any) => {
    console.error(
      "Failure occurred whilst user was signing in with Google: ",
      response,
    );
  };

  const onGoogleSignOutFailure = () => {
    console.error("Failed to sign out with Google");
  };

  const onGoogleSignOutSuccess = () => {
    dispatch(userSlice.actions.setGoogleUser({ loginResponse: null }));
    console.log("User signed out with Google");
  };

  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    onFailure: onGoogleSignInFailure,
    onSuccess: onGoogleSignInSuccess,
    cookiePolicy: "single_host_origin",
  });

  const { signOut } = useGoogleLogout({
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    onFailure: onGoogleSignOutFailure,
    onLogoutSuccess: onGoogleSignOutSuccess,
  });

  const onGoogleLogout = () => {
    signOut();
  };

  const onGoogleSignIn = () => {
    signIn();
  };

  const onRenderSignInText = () => {
    return (
      <div key={"signinbtn"} className={"sign-in-button"}>
        <FaGoogle />
        <span>Sign in with Google</span>
      </div>
    );
  };

  // Display the sign-in button if there is no user logged in
  if (user === null) {
    return (
      <CommandButton
        onRenderText={onRenderSignInText}
        onClick={onGoogleSignIn}
      />
    );
  }

  const userPersona: IPersonaSharedProps = user
    ? {
        imageUrl: user.imageUrl,
        imageInitials: user.name.substring(0, 1),
        text: user.name,
        secondaryText: user.email,
      }
    : {};

  const onRenderUserPersona = () => {
    return (
      <Persona
        {...userPersona}
        size={PersonaSize.size24}
        imageAlt={`Signed in as ${user.name}`}
      />
    );
  };

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "SIGN_OUT",
        text: "Sign out",
        iconProps: { iconName: "SignOut" },
        onClick: onGoogleLogout,
      },
    ],
  };

  // Display a user button with a Sign Out option
  return (
    <div className="user-button-container">
      <CommandBarButton
        onRenderText={onRenderUserPersona}
        menuProps={menuProps}
      />
    </div>
  );
};
