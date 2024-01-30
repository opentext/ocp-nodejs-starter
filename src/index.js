import runApp from './runApp.js';

runApp()
  .then(() => console.log('App has finished running'))
  .catch(() => console.error('App has finished running with an error'));
