'use strict';
const path = require('path');
const apiTasks = '/api/tasks';
const CONFIRM = 'absolutely';

module.exports = function(app) {
  const router = app.loopback.Router();
  const taskModel = app.models.task;
  const dbConnector = taskModel.dataSource.settings.connector;

  router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });

  taskModel.observe('before save', function checkCensoredWords(ctx, next) {
    console.log(ctx);
    next();
  });

  router.delete(apiTasks, (req, res) => {
    console.log('REQUEST TO DELETE ALL TASKS');
    if (req.headers.confirm === CONFIRM) {
      taskModel.destroyAll((err, info) => {
        res.send(err || info);
      });
    } else {
      console.log('RESTRICTED');
      res.send('Restricted');
    }
  });

  router.get(`${apiTasks}/filter`, (req, res) => {
    let {matchCase, exactMatch, query} = req.query;

    if (dbConnector === 'postgresql') {
      matchCase = JSON.parse(matchCase) ? 'like' : 'ilike';
      query = JSON.parse(exactMatch) ? query : `%${query}%`;
      taskModel.find(
        {
          where: {
            name: {
              [matchCase]: query,
            },
          },
          order: `name ${req.query.order}`,
        }
      ).then((tasks) => res.send(tasks));
    }

    if (dbConnector === 'mongodb') {
      matchCase = JSON.parse(matchCase) ? '' : 'i';
      query = JSON.parse(exactMatch) ? `^${query}$` : query;
      const pattern = new RegExp(query, matchCase);
      taskModel.find(
        {
          where: {
            name: {
              like: pattern,
            },
          },
          order: `name ${req.query.order}`,
        }
      ).then((tasks) => res.send(tasks));
    }
  });

  app.use(router);
};
