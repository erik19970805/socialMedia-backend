import { connect, connection, ConnectionOptions } from 'mongoose';
import { db } from './config/config';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

connect(db, dbOptions);

connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Mongodb Connection stablished');
});

connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log('Mongodb connection error:', err);
  process.exit();
});
