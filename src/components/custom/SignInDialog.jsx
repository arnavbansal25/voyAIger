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

export const SignInDialog = ({ open, callBack }) => {
  const getUserProfile = (tokenInfo) => {
    console.log("5566", tokenInfo);
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
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp?.data));
        callBack();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log("555", error),
  });

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <img src="/logo.svg" alt="Application Logo" />
            <h2 className="font-bold text-lg mt-7">Sgn In With Google</h2>
            <p>Sign in to te App with Google Authentication securely</p>

            <Button
              className="w-full mt-5 flex gap-4 items-center"
              onClick={login}
            >
              <FcGoogle className="w-7 h-7" /> Sign In With Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
