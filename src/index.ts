import dotenv from 'dotenv';

import app from './app';
import { connect, sync } from './database';
import { createVaccines, createCommunities } from './shared/bulkFixedData';

dotenv.config();
const port = process.env.PORT || 3000;

const runServer = async () => {
  await connect();
  await sync();
  await createCommunities();
  await createVaccines();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

runServer();
