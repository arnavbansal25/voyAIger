import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const SignInDialog = ({ triggerComp, callBack = () => {} }) => {
  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp?.data));
        callBack();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log("Error:", error),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComp}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <img src="/logo.svg" alt="Application Logo" />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="font-bold text-lg mt-7">Sign In With Google</div>
          <div>Sign in to VoyAIger with Google Authentication securely.</div>

          <Button
            className="w-full mt-5 flex gap-4 items-center"
            onClick={login}
          >
            <FcGoogle className="w-7 h-7" /> Sign In With Google
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
