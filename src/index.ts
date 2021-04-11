import { config } from 'dotenv';
import app from './app';
import './database';

config();

function main() {
  app.listen(app.get('port'));
  // eslint-disable-next-line no-console
  console.log('Server on port: ', app.get('port'));
}

main();
