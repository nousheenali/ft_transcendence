import Image from "next/image";

/**
 * @function ChannelsSearch
 * @returns JSX.Element
 * @description The ChannelsSearch component is responsible for rendering the search box in the ChannelsSideBar component.
 * @component
 */
export default function ChannelsSearch() {
  return (
    <div className="flex justify-stretch items-center rounded-md bg-search-box-fill w-80 h-8 border-[0.5px] border-chat-search-stroke">
      <input
        className="ml-2 bg-search-box-fill font-thin text-sm text-search-box-text w-full h-full focus:outline-none hover:cursor-text"
        type="search"
        name="search"
        placeholder="Search"
      />
      <Image
        className="mr-2"
        alt="Chat Search"
        src="/chat/user-search.svg"
        width={23}
        height={23}
      />
    </div>
  );
}
