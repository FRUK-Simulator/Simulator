import React, { FunctionComponent } from "react";

// eslint-disable-next-line
const onGoogleSignIn = (googleUser: gapi.auth2.GoogleUser) => {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
};

export const SignIn: FunctionComponent = () => {
  return (
    <div>
      <div className="g-signin2" data-onsuccess="onGoogleSignIn"></div>
    </div>
  );
};
