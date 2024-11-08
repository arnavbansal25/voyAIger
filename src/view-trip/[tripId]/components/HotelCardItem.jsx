import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hotelImg from "@/assets/hotel.jpg";

export const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    getPlacePhoto();
  }, [hotel]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <Link
      className="text-black hover:text-black"
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}, ${hotel?.hotelAddress}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || hotelImg}
          alt="hotel-img"
          className="h-[180px] w-full object-cover rounded-xl"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm ">💰 {hotel?.price}</h2>
          {/* <h2 className="text-sm ">💰 {hotel?.price?.currency} {hotel?.price?.from}</h2> */}
          <h2 className="text-sm ">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};
