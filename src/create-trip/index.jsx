import { toast } from "sonner";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { db } from "@/service/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/AIModel";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { SignInDialog } from "@/components/custom/SignInDialog";
import { AI_PROMPT, budgetOptions, travelerOptions } from "@/constants/options";

export const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    setLoading(true);

    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.travellers
    ) {
      toast("Please fill all details!");
      setLoading(false);
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travellers}", formData?.travellers)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    saveAiTrip(result?.response?.text());
  };

  const saveAiTrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us tour travel preference 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY_PRANAV}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {budgetOptions?.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item?.title && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("budget", item?.title)}
              >
                <h2 className="text-4xl">{item?.icon}</h2>
                <h2 className="font-bold text-lg">{item?.title}</h2>
                <h2 className="text-sm text-gray-500">{item?.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {travelerOptions?.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.travellers === item?.people &&
                  "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("travellers", item?.people)}
              >
                <h2 className="text-4xl">{item?.icon}</h2>
                <h2 className="font-bold text-lg">{item?.title}</h2>
                <h2 className="text-sm text-gray-500">{item?.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        {isLoggedIn ? (
          <Button disable={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        ) : (
          <SignInDialog
            triggerComp={<Button>Sign In to Generate Trip</Button>}
            callBack={() => {
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};
