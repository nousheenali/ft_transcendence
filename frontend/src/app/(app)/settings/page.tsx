'use client';
import SettingDetails from '@/components/Setting/SettingDetails/SettingDetails';
import SettingHeader from '@/components/Setting/SettingHeader/SettingHeader';

export default function Settings() {
  return (
    <div className="w-full flex p-6">
      <div className="w-full bg-box-fill bg-opacity-70 rounded-2xl border-b border-grid-border border-opacity-80 relative">
        <SettingHeader />
        <SettingDetails
          name="Name"
          Auth="Not activated"
        />
      </div>
    </div>
  );
}
