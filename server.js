const express = require('express');
const app = express();
const db = require('./db');

const port = process.env.PORT || 3000;

const init = async () => {
  await db.sync();
  await db.seed();
};
init();
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
