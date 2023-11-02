export type ChannelType = {
  name: string;
  value: string;
};

export type CreateChannelItems = {
  channelName: string | null;
  channelType: "PRIVATE" | "PUBLIC" ;
  createdBy: string;
  password: string | null;
};
