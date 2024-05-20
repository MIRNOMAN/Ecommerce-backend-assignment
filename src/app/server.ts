import app from './app';

import mongoose from 'mongoose';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
