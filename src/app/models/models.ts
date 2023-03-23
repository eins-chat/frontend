export class User {
  public readonly username: string;
  public readonly passwortHash: string;

  constructor(username: string, passwortHash: string) {
    this.username = username;
    this.passwortHash = passwortHash;
  }
}

export enum MessageType {
  PRIVATE_CHAT,
  GROUP_CHAT,
}

export class Message {
  public content: string;
  public receiver: string;
  public author?: string;
  public timestamp?: number;
  public type: MessageType = MessageType.PRIVATE_CHAT;

  constructor(
    content: string,
    receiver: string,
    type: MessageType,
    author?: string,
    timestamp?: number
  ) {
    this.content = content;
    this.receiver = receiver;
    this.type = type;
    this.author = author;
    this.timestamp = timestamp;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
export class Group {
  public readonly groupID: string;
  public readonly memberList: string[];
  public readonly groupName: string;
  constructor(groupID: string, groupName: string, memberList: string[]) {
    this.groupID = groupID;
    this.groupName = groupName;
    this.memberList = memberList;
  }
}
