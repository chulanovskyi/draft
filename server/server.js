'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();
const webpack = require('webpack');
const env = require('./environment');
const mode = process.env.NODE_ENV || env.DEVELOPMENT;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require(`../webpack.config.${mode}`);
const compiler = webpack(config);

if (mode === env.DEVELOPMENT) {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
}
app.use(webpackHotMiddleware(compiler));

app.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module)
    app.start();
});
