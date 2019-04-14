import restore from 'mongodb-restore';
import path from 'path';

import config from '../../utils/loadconfig';

restore({
  // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
  uri: `${config.get('mongo.host')}/${config.get('mongo.database')}`,
  root: path.resolve(__dirname, `./${config.get('db.dump')}/${config.get('mongo.database')}`),
  metadata: true,
  dropCollections: [],
  callback: (...args) => {
    console.log(args); // eslint-disable-line no-console
  }
});
