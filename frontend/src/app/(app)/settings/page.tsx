import React from "react";
import SettingDetails from "@/components/Setting/SettingDetails/SettingDetails";
import SettingHeader from "@/components/Setting/SettingHeader/SettingHeader";
import SettingAvatar from "@/components/Setting/SettingAvatar/SettingAvatar";

export default function Settings() {
  return (
    <div className="w-full flex p-6">
      <div className="w-full bg-box-fill bg-opacity-70 rounded-2xl border-b border-grid-border border-opacity-80 relative">
        <SettingHeader />
        <SettingAvatar />
        <hr className="mx-20 mt-10 mb-10  border-heading-stroke-30" />
        <SettingDetails
          name="Sumaiya Fathima"
          email="sfathima@student.42abudhabi.ae"
          Auth="Not activated"
        />
      </div>
    </div>
  );
}
