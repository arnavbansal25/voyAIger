import React from "react";
import { PlaceCardItem } from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div className="mt-5">
        {trip?.tripData?.travelPlan?.itinerary?.map((item, inde) => (
          <div>
            <h2 className="font-medium text-lg">Day {item?.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.places?.map((place, placeIndex) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place?.bestTimeToVisit}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
              {item?.activities?.map((place, placeIndex) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place?.bestTimeToVisit}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
