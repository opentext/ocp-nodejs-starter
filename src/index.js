import callOcp from './callOcp.js';

callOcp()
  .then(() => console.log('App has finished running'))
  .catch(() => console.error('App has finished running with an error'));
