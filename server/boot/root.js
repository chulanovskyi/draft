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
    if (req.headers.confirm === 'absolutely') {
      app.models.task.destroyAll((err, info) => {
        res.send(err || info);
      });
    } else {
      console.log('RESTRICTED');
      res.send('Restricted');
    }
  });
};

/*
  http://localhost:3000/api/tasks?filter={%22where%22:{%22name%22:{%22like%22:%22others%22,%22options%22:%22i%22}}}
 */
