export default class Memory {

    id: string;
    threadID: string;
    content: string;

    constructor(threadID: string, content: string) {
        this.id = ""; //Generate random ID
        this.threadID = threadID;
        this.content = content;

    }
}