"use client";
import { Authenticator } from "@aws-amplify/ui-react";

export default function LoginComponent() {
  return (
    <div className="login-component">
      <Authenticator></Authenticator>
    </div>
  );
}
