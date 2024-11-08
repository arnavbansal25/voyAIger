import React, { useEffect, useState } from "react";
import trpiImg from "@/assets/trip.jpg";
import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

export const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await getPlaceDetails(data).then((res) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );

      setPhotoUrl(photoUrl);
    });
  };

  return (
    <Link to={`/view-trip/${trip?.id}`} className="text-black hover:text-black">
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl || trpiImg}
          alt="trip-img"
          className="h-[200px] w-full object-cover rounded-xl"
        />

        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};
