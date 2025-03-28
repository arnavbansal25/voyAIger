function normalizeHotel(hotel) {
  if (!hotel || typeof hotel !== "object") return hotel;
  return {
    ...hotel,
    hotelAddress:
      hotel.hotelAddress ?? hotel["hotel address"] ?? hotel.address ?? "",
    hotelName: hotel.hotelName ?? hotel.hotelname ?? hotel.name ?? "",
    hotelImageUrl:
      hotel.hotelImageUrl ?? hotel.hotelImageURL ?? hotel["hotel image url"],
  };
}

function normalizePlace(place) {
  if (!place || typeof place !== "object") return place;
  return {
    ...place,
    placeName: place.placeName ?? place.name ?? "",
    placeDetails:
      place.placeDetails ?? place["place details"] ?? place.details ?? "",
    bestTimeToVisit:
      place.bestTimeToVisit ?? place["best time to visit"] ?? "",
    ticketPricing: place.ticketPricing ?? place["ticket pricing"] ?? "",
  };
}

function normalizeItineraryDay(day, index) {
  const places = day?.places ?? day?.activities ?? [];
  return {
    ...day,
    day: day?.day ?? index + 1,
    places: Array.isArray(places) ? places.map(normalizePlace) : [],
  };
}

export function normalizeTripData(raw) {
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid trip data");
  }

  let travelPlan = parsed.travelPlan ?? parsed.travelplan;

  if (!travelPlan) {
    if (parsed.hotels || parsed.hotelOptions || parsed.itinerary) {
      travelPlan = parsed;
    }
  }

  if (!travelPlan) {
    throw new Error("Missing travel plan in response");
  }

  const hotels = travelPlan.hotels ?? travelPlan.hotelOptions ?? [];
  const itinerary = travelPlan.itinerary ?? [];

  return {
    ...parsed,
    travelPlan: {
      ...travelPlan,
      hotels: Array.isArray(hotels) ? hotels.map(normalizeHotel) : [],
      itinerary: Array.isArray(itinerary)
        ? itinerary.map(normalizeItineraryDay)
        : [],
    },
  };
}
