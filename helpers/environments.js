const environments = {};

environments.staging = {
    port: 3000,
    host:'127.0.0.1',
    envName: 'staging',
}
environments.production = {
    port: 5000,
    host:'127.0.0.1',
    envName: 'production',
}

const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

const environmentToExport = typeof (environments[currentEnvironment]) ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;