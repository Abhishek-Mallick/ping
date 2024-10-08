import { initServer } from './app';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function init() {
    
    const app = await initServer();
    const port = process.env.GRAPHQL_PORT || 8000;
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}

init().catch(console.error); // Call init function and handle any errors