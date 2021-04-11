import { connect } from 'mongoose';
import { db } from './config/config';

connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  // eslint-disable-next-line no-console
  .then(() => console.log('connected to mongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));
