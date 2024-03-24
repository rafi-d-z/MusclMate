import { app, activate_db } from './app';

const startServer = async () => {
  try {
    await activate_db();

    const PORT: number = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};

startServer();
