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
      name: 'acc-{{{scaffold_project_directory}}}',
      script: 'lib/index.js',
      env: {
        NODE_ENV: 'acceptance'
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
