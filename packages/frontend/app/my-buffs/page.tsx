"use server"

import MyBuffsContent from "@/components/myBuffsComponents/MyBuffsContent";

const MyBuffsPage = async () => {
  return (
    <div className="flex items-center justify-center font-sans">
      <MyBuffsContent />
    </div>
  );
};

export default MyBuffsPage;
