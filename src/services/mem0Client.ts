import { Memory } from 'mem0ai/oss'
import { config } from '../config.js';

const MemoryClient = Memory.fromConfig({
    embedder: {
        provider: 'openai',
        config: {
            apiKey: config.OPENAI_API_KEY,
            model: 'text-embedding-3-small'
        }
    },
    vector_store: {
        provider: 'weaviate',
        config: {
            collection_name: 'karen',
            cluster_url: 'https://vec.dylandunn.me',
            auth_client_secret: null
        }
    },
    llm: {
        provider: 'openai',
        config: {
            apiKey: config.OPENAI_API_KEY,
            model: 'gpt-4o-mini'
        }
    }
});

export default MemoryClient;
