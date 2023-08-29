export default function SettingHeader() {
  return (
    <div className="h-[30px] justify-center items-center space-x-4 bg-heading-fill rounded-t-2xl border border-heading-stroke flex">
      <div className="font-saira-condensed font-bold text-xl text-main-text">
        Settings
      </div>
      <div>
        <img height={25} width={25} src="/settings_logo.svg" alt="settings logo"/>
      </div>
    </div>
  );
}
