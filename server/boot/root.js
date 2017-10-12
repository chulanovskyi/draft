'use strict';
const path = require('path');
const taskModel = require('../../common/models/task.json');

module.exports = function(server) {
  const router = server.loopback.Router();
  router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });
  server.use(router);

  const postgres = server.dataSources.reserve;

  // postgres.createModel(taskModel.name, taskModel.properties, taskModel.options);
  postgres.autoupdate(taskModel.name);
};
