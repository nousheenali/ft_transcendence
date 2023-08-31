import Image from 'next/image';
import { TableCellProps } from './types';

const TableCell: React.FC<TableCellProps> = ({ dataItem }) => {
  if (typeof dataItem === 'string') {
    return <div className="py-2 flex-1 text-center">{dataItem}</div>;
  }
  // checks if there is playerName property in the data item then returns the relevent styles for the cell
  if ('playerName' in dataItem) {
    return (
      <div className="py-2 flex-1 text-center">
        <div className="flex-1 flex items-center justify-center flex-row">
          <div className="w-12 h-12 mb-2 mr-3">
            <Image height={50} width={50} src={dataItem.img} alt="avatar" />
          </div>
          <div>
            {dataItem.playerName?.length > 3
              ? `${dataItem.playerName.substring(0, 3)}..`
              : dataItem.playerName}
          </div>
        </div>
      </div>
    );
  }

  // if both of the above doesnt match , returns the cell styles to show the action icons
  return (
    <div className="py-2 flex-1 text-center">
      <div className="flex items-center justify-center flex-row hover:cursor-pointer">
        <Image
          height={25}
          width={25}
          src={dataItem.iconImg}
          alt="action icon"
        />
      </div>
    </div>
  );
};

export default TableCell;
