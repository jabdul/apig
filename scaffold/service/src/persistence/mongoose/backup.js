import restore from 'mongodb-backup';
import path from 'path';

import config from '../../utils/loadconfig';

restore({
  // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
  uri: `${config.get('mongo.host')}/${config.get('mongo.database')}`,
  root: path.resolve(__dirname, `./${config.get('db.dump')}`),
  metadata: true,
  collections: [],
  callback: (...args) => {
    console.log(args); // eslint-disable-line no-console
  }
});
