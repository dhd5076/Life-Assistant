import Memory from './Memory';
export default class MemoryController {
    constructor() {

    }

    createMemory(memory: Memory) {

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