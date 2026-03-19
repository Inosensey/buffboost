"use server";
// import { cookies } from "next/headers";

// lib/Api
import { nestJsEndpoints } from "@/lib/nestJsEndpoints";

// utils
import { buffHelper } from "utils/nestJsEndPointHelper";

// components
import BoostingStationContent from "@/components/boostingStationComponents/BoostingStationContent";

const BoostingStationPage = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // nestJsEndpoints.setServerToken(token || null);

  const response = await nestJsEndpoints.buffsApi.getAll();

  const purchasedBuffsTodayResponse =
    await nestJsEndpoints.buffsApi.getCurrentPurchasedBuffsToday();

  const purchasedBuffsToday = buffHelper.extractBuffsFromPurchasedBuffs(
    purchasedBuffsTodayResponse.data,
  );

  const currentActiveBuffResponse = await nestJsEndpoints.buffsApi.getCurrentActiveBuff();
  const currentActiveBuff = currentActiveBuffResponse.data;

  const arrangeBuffs = buffHelper.arrangeBuffByType(response.data);
  return (
    <div className="flex items-center justify-center font-sans">
      <BoostingStationContent buffs={arrangeBuffs} purchasedBuffsToday={purchasedBuffsToday} currentActiveBuff={currentActiveBuff} />
    </div>
  );
};

export default BoostingStationPage;
