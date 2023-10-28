"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function HomeSignInButton() {
  return (
    <div className="flex items-center justify-center mt-4">
      <Button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign In With Google
      </Button>
    </div>
  );
}
