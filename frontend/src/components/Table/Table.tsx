import React from 'react';
import Image from 'next/image';

interface PlayerData {
  playerName: string;
  img: string;
  name: string;
}

interface ActionIconData {
  iconName: string;
  iconImg: string;
}

type TableRowData = (string | PlayerData | ActionIconData)[];

interface ResponsiveTableProps {
  headings: string[];
  data: TableRowData[];
  maxHeight: string;
}



const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  headings,
  data,
  maxHeight,
}) => {
  return (
    <div className="max-w-full mx-auto font-saira-condensed ">
      <div className="flex flex-col">
        <div className="flex bg-table-header-bg justify-center items-center">
          {headings.map((heading, index) => (
            <div
              key={index}
              className="py-2 text-table-header-text-color font-saira-condensed flex-1 text-center"
            >
              {heading}
            </div>
          ))}
        </div>
        <div
          className="overflow-y-scroll text-table-row-text-color"
          style={{ maxHeight: maxHeight }}
        >
          {data.map((rowData, rowIndex) => (
            <div
              key={rowIndex}
              className="bg-table-row-bg rounded-[10px] flex mt-3 justify-center items-center"
            >
              {rowData.map((dataItem, columnIndex) => {
                if (typeof dataItem === 'string') {
                  return (
                    <div key={columnIndex} className="py-2 flex-1 text-center">
                      {dataItem}
                    </div>
                  );
                }

                if ('playerName' in dataItem) {
                  return (
                    <div key={columnIndex} className="py-2 flex-1 text-center">
                      <div className="flex-1 flex items-center justify-center flex-row">
                        <div className="w-12 h-12 mb-2 mr-3">
                          <Image
                            height={50}
                            width={50}
                            src={dataItem.img}
                            alt="avatar"
                          />
                        </div>
                        <div>
                          {dataItem.playerName && dataItem.playerName.length > 3
                            ? `${dataItem.playerName.substring(0, 3)}..`
                            : dataItem.playerName}
                        </div>
                      </div>
                    </div>
                  );
                }

                if ('iconName' in dataItem) {
                  return (
                    <div key={columnIndex} className="py-2 flex-1 text-center">
                      <div className="flex items-center justify-center flex-row  hover:cursor-pointer">
                        <Image
                          height={25}
                          width={25}
                          src={dataItem.iconImg}
                          alt="action icon"
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTable;
