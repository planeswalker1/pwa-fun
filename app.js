const express = require('express');
const app = express();
const path = require('path');

const config = require('./app/models/config');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, function () {
  console.log('listening at http:localhost:%s in %s mode', config.port, app.get('env'));
});