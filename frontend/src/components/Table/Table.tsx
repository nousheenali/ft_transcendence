"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ResponsiveTableProps } from './types';
import TableCell from './TableCell';
import { PlayerData } from './types';


// This table is used everywhere in our project with diffrent columns and diffrent data .
const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  searchBar,
  header,
  headerImage,
  headings,
  data,
  maxHeight,
  activeButton,
  reloadPageData
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setInputValue("");
    setFilteredData(data);
  }, [data]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setInputValue(query);

    const filtered = data.filter((rowData :any) =>
      rowData[0].playerName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  

  return (
    <div className="max-w-full mx-auto font-saira-condensed font-bold ">
      <div className="flex flex-col">
        {/* Search Bar */}
        {searchBar ? (
          <div className="flex flex-row py-1 mt-2 h-10 justify-center font-saira-condensed text-xl text-main-text bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke">
            <div className=" flex flex-row w-3/4 justify-center font-saira-condensed text-xl text-main-text">
              <h1 className="px-2 text-right">{header}</h1>
              <Image
                className="mr-2"
                alt="Header Image"
                src={headerImage}
                width={25}
                height={25}
              />
            </div>
            <div className="flex justify-stretch w-1/4 mr-4 rounded-2xl bg-search-box-fill w-64 h-7 border-[0.5px] border-chat-search-stroke">
              <input
                className="ml-2 bg-search-box-fill font-thin  rounded-2xl text-sm text-search-box-text w-full h-full focus:outline-none hover:cursor-text"
                type="search"
                name="search"
                placeholder="Search"
                onChange={handleSearchInputChange}
              />
              <Image
                className="mr-2"
                alt="Search"
                src="user-search.svg"
                width={15}
                height={15}
              />
            </div>
          </div>
        ) : null}
        <div className="flex bg-table-header-bg justify-center items-center">
          {/* table headings */}
          {headings.map((heading, index) => (
            <div
              key={index}
              className="py-2 text-table-header-text-color flex-1 text-center"
            >
              {heading}
            </div>
          ))}
        </div>
        <div
          className="overflow-y-scroll text-table-row-text-color"
          style={{ maxHeight }}
        >
          {/* table rows */}
          {filteredData.map((rowData: any, rowIndex) => (
            <div
              key={rowIndex}
              className="bg-table-row-bg rounded-[10px] flex mt-3 justify-center items-center"
            >
              {rowData.map((dataItem: any, columnIndex: number) => (
                <TableCell
                  key={columnIndex}
                  dataItem={dataItem}
                  login={rowData[0].playerName}
                  activeButton={activeButton}
                  reloadPageData={reloadPageData}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResponsiveTable;
