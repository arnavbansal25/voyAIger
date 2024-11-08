import React from "react";
import { HotelCardItem } from "./HotelCardItem";

export const Hotels = ({ trip }) => {
  const hotels =
    trip?.tripData?.travelPlan?.hotels ||
    trip?.tripData?.travelPlan?.hotelOptions;

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {hotels?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} />
        ))}
      </div>
    </div>
  );
};
