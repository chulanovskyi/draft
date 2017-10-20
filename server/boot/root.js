'use strict';
const taskSchema = require('../../common/models/task.json');

module.exports = function(app) {
  const db = app.dataSources.modelConfig;

  db.createModel(taskSchema.name, taskSchema.properties, taskSchema.options);
  db.autoupdate(taskSchema.name);
};

/*
  http://localhost:3000/api/tasks?filter={%22where%22:{%22name%22:{%22like%22:%22others%22,%22options%22:%22i%22}}}

  http://localhost:3000/api/tasks?filter={%22where%22:{%22name%22:{%22like%22:%22f%25%22}}}
  %25 === % (percent sign in url)

 */
