const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());

const login = require('./app/routes/login.js');
app.use('/api', login);

const clip = require('./app/routes/clip.js');
app.use('/api', clip);

const sticker = require('./app/routes/sticker.js');
app.use('/api', sticker);

const sound = require('./app/routes/sound.js');
app.use('/api', sound);

const user = require('./app/routes/user.js');
app.use('/api', user);

app.listen(3000);