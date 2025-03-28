import { Button } from "@/components/ui/button";
import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { getPlacePhotoName } from "@/service/placePhotos";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import placeImg from "@/assets/place.jpg";

export const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    getPlacePhoto();
  }, [place]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };

    try {
      const res = await getPlaceDetails(data);
      const photoName = getPlacePhotoName(res);
      if (photoName) {
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoName));
      }
    } catch {
      /* fallback to placeImg */
    }
  };

  return (
    <Link
      className="text-black hover:text-black"
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border border-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl || placeImg}
          alt="place-img"
          className="min-w-[130px] w-[130px] h-[130px] rounded-xl object-cover"
        />

        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <h2 className="mt-2">💵 {place?.ticketPricing}</h2>

          {/* <Button size="sm">
          <FaMapLocationDot />
        </Button> */}
        </div>
      </div>
    </Link>
  );
};
