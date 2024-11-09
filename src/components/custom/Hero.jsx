import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import mockUp from "@/assets/mockup.png";

export function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:{" "}
        </span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interest and budget.
      </p>

      <Link to="/create-trip" className="cursor-pointer z-10">
        <Button>Get Started, It's Free</Button>
      </Link>

      <div>
        <img src={mockUp} alt="mockup-interface-img" />
      </div>
    </div>
  );
}
