export const travelerOptions = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveller in exploration",
    icon: "🎒",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travellers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving people",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch thrill seekers",
    icon: "🫂",
    people: " to 10 People",
  },
];

export const budgetOptions = [
  {
    id: 1,
    title: "Affordable",
    desc: "Stay conscious of costs",
    icon: "💸",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep costs on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry abouts cost",
    icon: "🤑",
  },
];

export const AI_PROMPT =
  'Generate a travel plan for {location}, for {totalDays} days, for {travellers}, with a {budget} budget. Return ONLY valid JSON (no markdown) in this exact shape: {"travelPlan":{"hotels":[{"hotelName":"","hotelAddress":"","price":"","hotelImageUrl":"","geoCoordinates":{"lat":0,"lng":0},"rating":"","description":""}],"itinerary":[{"day":1,"places":[{"placeName":"","placeDetails":"","placeImageUrl":"","geoCoordinates":{"lat":0,"lng":0},"ticketPricing":"","bestTimeToVisit":"","openingHours":""}]}]}}. Include at least 4 hotels and a full {totalDays}-day itinerary. All keys must use camelCase.';
