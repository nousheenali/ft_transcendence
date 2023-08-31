import React from 'react';
import Image from 'next/image';
import { ResponsiveTableProps } from './types';
import TableCell from './TableCell';

// This table is used everywhere in our project with diffrent columns and diffrent data .
const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  headings,
  data,
  maxHeight,
}) => (
  <div className="max-w-full mx-auto font-saira-condensed ">
    <div className="flex flex-col">
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
        {data.map((rowData, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-table-row-bg rounded-[10px] flex mt-3 justify-center items-center"
          >
            {rowData.map((dataItem, columnIndex) => (
              <TableCell key={columnIndex} dataItem={dataItem} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ResponsiveTable;
