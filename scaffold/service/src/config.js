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
});
