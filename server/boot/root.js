'use strict';
const path = require('path');
const taskModel = require('../../common/models/task.json');

module.exports = function(app) {
  const router = app.loopback.Router();
  const postgres = app.dataSources.modelConfig;
  postgres.createModel(taskModel.name, taskModel.properties, taskModel.options);
  postgres.autoupdate(taskModel.name);

  router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });
  app.use(router);

  router.delete('/api/tasks', (req, res) => {
    console.log('REQUEST TO DELETE ALL TASKS');
    app.models.task.destroyAll((err, info) => {
      res.send(err || info);
    });
  });
};
