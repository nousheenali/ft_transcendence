// import SideBar from "@/components/SideBar";

export default function DashBoardPage() {
  return (
<div className="p-2 h-full flex flex-col mr-[35px]">
  <div className="text-white items-center border-b-2 stroke-slate-200 flex bg-box-fill mb-10 h-[160px]">
    <h1 className="text-center self-center">GAME STATUS</h1>
  </div>
  <div className="text-white grid grid-cols-3 gap-10 h-full">
    <div className="col-span-2 items-center justify-center border-b-2 stroke-slate-200 flex bg-box-fill mr-8 overflow-y-scroll">
      GAME HISTORY
    </div>
    <div className="col-span-1 items-center justify-center border-b-2 stroke-slate-200 flex bg-box-fill ml-10 overflow-y-scroll">
      LIVE GAMES
    </div>
  </div>
</div>

  );
}
