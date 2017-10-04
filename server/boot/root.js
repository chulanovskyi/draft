'use strict';
const path = require('path');

module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });
  server.use(router);
};
