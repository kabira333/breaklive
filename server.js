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

app.listen(3000);