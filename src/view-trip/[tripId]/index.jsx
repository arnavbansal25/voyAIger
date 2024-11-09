import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { InfoSection } from "./components/InfoSection";
import { Hotels } from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import { Footer } from "./components/Footer";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";

export const ViewTrip = () => {
  const isLoggedIn = useIsLoggedIn();

  const { tripId } = useParams();

  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "Trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap) {
      setTrip(docSnap.data());
    } else {
      toast("No trip found!");
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer />
    </div>
  );
};
