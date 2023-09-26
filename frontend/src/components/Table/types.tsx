export interface PlayerData {
  playerName: string;
  img: string;
  name: string;
}

export interface ActionIconData {
  iconName: string;
  iconImg: string;
}

// In the array of table row data, there can be string , or type of playerdata or type of icondata
export type TableRowData = (string | PlayerData | ActionIconData)[];

export interface ResponsiveTableProps {
  searchBar: boolean;
  header: string;
  headerImage: string;
  headings: string[];
  data: TableRowData[];
  maxHeight: string;
}

export type TableCellProps = {
  dataItem: string | PlayerData | ActionIconData;
};
