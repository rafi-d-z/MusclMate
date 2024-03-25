import create_app from './app';

async function startServer() {
  try {
    const app = await create_app(); 

    const PORT: number = 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();