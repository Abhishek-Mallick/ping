"use client"; // This tells Next.js it's a client-side component

import { useCallback } from "react"; // Import useCallback
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const handleLoginWithGoogle = useCallback((cred: CredentialResponse) => {
    console.log(cred); // Log the credentials received
  }, []);

  return (
    <GoogleLogin
      onSuccess={handleLoginWithGoogle} // Use the handleLoginWithGoogle function
      onError={() => console.log("Login Failed")}
    />
  );
}
