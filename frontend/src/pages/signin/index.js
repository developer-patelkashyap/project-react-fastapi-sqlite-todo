import React from "react";
import LoginForm from "../../forms/login";
import Copyright from "../../components/copyright";

export default function SignInPage() {
  return (
    <>
      <LoginForm></LoginForm>
      <Copyright sx={{ mt: 8, mb: 4 }}></Copyright>
    </>
  );
}
