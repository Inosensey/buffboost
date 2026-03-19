"use server"

import { nestJsEndpoints } from "@/lib/nestJsEndpoints";

import MyBuffsContent from "@/components/myBuffsComponents/MyBuffsContent";

const MyBuffsPage = async () => {

  const purchasedBuffsTodayResponse = await nestJsEndpoints.buffsApi.getCurrentPurchasedBuffsToday(); 
  const purchasedBuffsHistoryResponse = await nestJsEndpoints.buffsApi.getCurrentPurchasedBuffsHistory();

  return (
    <div className="flex items-center justify-center font-sans">
      <MyBuffsContent historyBuffs={purchasedBuffsHistoryResponse.data} todayBuffs={purchasedBuffsTodayResponse.data} />
    </div>
  );
};

export default MyBuffsPage;
