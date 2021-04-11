import { config } from 'dotenv';
import app from './app';

config();

function main() {
  app.listen(app.get('port'));
  console.log('Server on port: ', app.get('port'));
}

main();
