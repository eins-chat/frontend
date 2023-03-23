export interface User {
  name: string;
  passwortHash: string;
}

export enum MessageType {
  PRIVATE_CHAT = 0,
  GROUP_CHAT = 1,
}

export interface Message {
  content: string;
  receiver: string;
  type: MessageType;
  author?: string;
  timestamp?: number;
}
export interface Group {
  id: string;
  name: string;
  members: string[];
}
