module.exports = {
  apps: [
    {
      name: 'dev-{{{scaffold_project_directory}}}',
      cwd: __dirname,
      script: 'yarn run dev',
      args: '',
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: '{{{scaffold_project_directory}}}',
      script: 'lib/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
