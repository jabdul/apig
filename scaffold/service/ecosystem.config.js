module.exports = {
  apps : [{
    name   : "{{{scaffold_project_name}}}",
    script : "lib/index.js",
    env_production : {
      NODE_ENV: "production"
    }
  }]
}
