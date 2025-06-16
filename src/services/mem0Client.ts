import { Memory } from 'mem0ai/oss';

const MemoryClient = new Memory({
  version: 'v1.1',
  embedder: {
    provider: 'openai',
    config: {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'text-embedding-3-small',
    },
  },
  vectorStore: {
    provider: 'qdrant',
    config: {
      collectionName: 'karen',
      url: 'http://192.168.1.171:6333',
      dimension: 1536,
    },
  },
  llm: {
    provider: 'openai',
    config: {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4.1-nano',
    },
  },
  historyDbPath: 'memory.db',
  customPrompt: `
  Format the output as a JSON object with a "facts" key containing an array of relevant facts extracted from the input text.
    You are tasked with saving relevant information from conversations to a memory store.

    Here is an example of how to format the memory:
    Input: I am John Doe, and I would like to return the shoes I bought last week.
    Output: {"facts" : ["Customer name: John Doe", "Wants to return shoes", "Purchase made last week"]}

    Input: I ordered a red shirt, size medium, but received a blue one instead.
    Output: {"facts" : ["Ordered red shirt, size medium", "Received blue shirt instead"]}
  `
});

export default MemoryClient;