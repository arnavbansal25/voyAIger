import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { SignInDialog } from "./SignInDialog";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";

export const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/" className="flex gap-2 items-center text-black">
        <img src="/logo.svg" alt="Application Logo" />
        <span className="font-bold text-xl">VoyAIger</span>
      </a>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip" className="text-black">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips" className="text-black">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className="bg-transparent p-0 rounded-full">
                <img
                  src={user.picture}
                  alt="user-img"
                  className="w-[35px] h-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={logout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <SignInDialog
            triggerComp={<Button>Sign In</Button>}
            callBack={() => {
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};
