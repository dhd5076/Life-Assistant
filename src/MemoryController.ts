import Memory from './Memory';
export default class MemoryController {

    memories : Memory[] = [];

    constructor() {

    }

    createMemory(memory: Memory) {
        this.memories.push(memory);
    }

    readMemory(memoryId: string): Memory {
        return new Memory("Not Implemented", "NOT IMPLEMENTED"); //TODO: Implement read logic
    }

    updateMemory(memoryId: string, content: string) {

    }

    deleteMemory(memoryId: string) {

    }

    queryMemories(query: string): Memory[] {
        return []; //TODO: Implement query logic
    }
}