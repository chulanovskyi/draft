'use strict';
const path = require('path');
const taskModel = require('../../common/models/task.json');

module.exports = function(app) {
  const router = app.loopback.Router();
  router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });
  app.use(router);

  const postgres = app.dataSources.modelConfig;
  postgres.createModel(taskModel.name, taskModel.properties, taskModel.options);
  postgres.autoupdate(taskModel.name);
};
