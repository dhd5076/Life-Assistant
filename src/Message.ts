export default class Message {

    threadID: string;
    sender: string;
    content: string;
    timestamp: Date;

    constructor(sender: string, content: string, threadID: string ) {
        this.threadID = threadID;
        this.sender = sender;
        this.content = content;
        this.timestamp = new Date(); //TODO: Check if this sets to current time
    }
}