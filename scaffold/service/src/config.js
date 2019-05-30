export default ({
  service: {
    name: {
      doc: 'Service namespace',
      format: String,
      default: '{{{scaffold_project_directory}}}',
      env: 'SERVICE_NAME',
      arg: 'service-name',
    },
  },
  twoFactorAuth: {
    window: {
      doc: 'Two factor authentication window',
      format: Number,
      default: 3,
      env: 'TWO_FACTOR_AUTH_WINDOW',
      arg: 'two-factor-auth-window',
    },
  },
  db: {
    dump: {
      doc: 'Mongodb data seed and dump path',
      format: String,
      default: '__migration__',
      env: 'DB_SEED',
      arg: 'db-seed',
    },
  },
});
