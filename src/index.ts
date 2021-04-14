/* eslint-disable import/first */
import { config } from 'dotenv';

config();
import app from './app';
import './database';

function main() {
  app.listen(app.get('port'));
  // eslint-disable-next-line no-console
  console.log('Server on port: ', app.get('port'));
}

main();
