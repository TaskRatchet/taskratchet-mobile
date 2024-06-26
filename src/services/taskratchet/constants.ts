//TODO: Revisit this file and make sure all values are correct

export const HOSTNAME = window && window.location && window.location.hostname;
export const IS_PRODUCTION = HOSTNAME === 'app.taskratchet.com';
export const IS_STAGING = HOSTNAME && HOSTNAME.includes('deploy-preview');
export const IS_LOCAL = !IS_PRODUCTION && !IS_STAGING;
export const API1_BASE = 'https://api.taskratchet.com/api1/';
export const API2_BASE = 'https://api.taskratchet.com/api2/';
// export const API1_BASE = IS_PRODUCTION
//   ? 'https://api.taskratchet.com/api1/'
//   : IS_STAGING
//   ? 'https://taskratchet-api-node-c3yk2gl5eq-uc.a.run.app/api1/'
//   : 'http://localhost:8080/api1/';
// export const API2_BASE = IS_PRODUCTION
//   ? 'https://api.taskratchet.com/api2/'
//   : IS_STAGING
//   ? 'https://taskratchet-api-node-c3yk2gl5eq-uc.a.run.app/api2/'
//   : 'http://localhost:8080/api2/';
