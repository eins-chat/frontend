export class User {
  public readonly username: string;
  public readonly passwortHash: string;

  constructor(username: string, passwortHash: string) {
    this.username = username;
    this.passwortHash = passwortHash;
  }
}

export class Message {
  public content: string;
  public receiver: string;
  public author?: string;
  public timestamp?: number;

  constructor(
    content: string,
    receiver: string,
    author?: string,
    timestamp?: number
  ) {
    this.content = content;
    this.receiver = receiver;
    this.author = author;
    this.timestamp = timestamp;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
