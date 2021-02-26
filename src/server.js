const express = require('express');
const { resolve } = require('path');

const app = express();
app.use(express.static(resolve(__dirname, '../dist'), { maxAge: 5 * 1000 }));
app.listen(3000);
