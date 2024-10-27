"use client"; // This tells Next.js it's a client-side component

import { useCallback } from "react"; // Import useCallback
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query"

export default function GoogleLoginButton() {
  const handleLoginWithGoogleConsole = useCallback((cred: CredentialResponse) => {
    console.log(cred); // Log the credentials received -- old func to log creds to console
  }, []);

  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;

    if(!googleToken)
      return toast.error("Google login failed");
    
    // Verify the google token
    try {
      const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
      console.log("Verification result:", verifyGoogleToken);
      
      // if user is verified store the token in local storage
      if(verifyGoogleToken) {
          window.localStorage.setItem("__ping_token", verifyGoogleToken);
          toast.success("Verified successful"); // Moved success toast here
      }
      queryClient.invalidateQueries('curent-user');
    } catch (error) {
      console.error("Verification error:", error);  // Log full error details
      toast.error("Token verification failed.");
    }
    
    console.log("googleToken: ", googleToken); // Moved outside of the try-catch
  }, [queryClient])

  return (
    <GoogleLogin
      onSuccess={handleLoginWithGoogle} // Use the handleLoginWithGoogle function
      onError={() => console.log("Login Failed")}
    />
  );
}
