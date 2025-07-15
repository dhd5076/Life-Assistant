import Message from "./Message";
import Core from "./Core";

export default class Assistant {

    cores: Core[] = [];
    messageQueue: Message[] = [];
    isBusy: boolean = false;

    constructor() {

    }

    addMessageToQueue(message: Message): Promise<void> {
        return new Promise((resolve) => {

        });
    }

    processNextMessage() : Promise<void> {
        return new Promise((resolve, reject) => {

        })
    }
}