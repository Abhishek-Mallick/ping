"use client"; // This tells Next.js it's a client-side component

import { useCallback } from "react"; // Import useCallback
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  const handleLoginWithGoogleConsole = useCallback((cred: CredentialResponse) => {
    console.log(cred); // Log the credentials received -- old func to log creds to console
  }, []);

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;

    if(!googleToken)
      return toast.error("Google login failed");
    
    // Verify the google token
    const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});

    toast.success("Verified successful");
    console.log("verifyGoogleToken: ",verifyGoogleToken);
    console.log("googleToken: ",googleToken);

    // if user is verified store the token in local storage
    if(verifyGoogleToken)
        window.localStorage.setItem("__ping_token", verifyGoogleToken);
  }, [])

  return (
    <GoogleLogin
      onSuccess={handleLoginWithGoogle} // Use the handleLoginWithGoogle function
      onError={() => console.log("Login Failed")}
    />
  );
}
