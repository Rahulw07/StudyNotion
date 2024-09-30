const axios = require('axios');

function setupPingServer(baseUrl) {
  axios.get(baseUrl)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status code${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

module.exports = setupPingServer;