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
  "Generate Travel Plan for Location : {location}, for {totalDays} Days for {travellers} People with a {budget} budget. Give me hotel options list with hotelName, hotel address, price, hotel image url, geo coordinates, rating, description. Suggest intinerary for all {totalDays} days with placeName, place details, place image url, geo coordinates, ticket pricing, best time to visit, opening hours in JSON format. All keys in JSON sohuld follow camelcasing.";
