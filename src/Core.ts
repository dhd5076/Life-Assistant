import MemoryController from './MemoryController';
import Message from './Message';

export default class Core {

    name: string;
    prompt: string;
    memoryController: MemoryController;

    constructor(name: string, prompt: string) {
        this.name = name;
        this.prompt = prompt;
        this.memoryController = new MemoryController();
    }

    handleMessage(message: Message) {

    }
}