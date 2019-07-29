'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT);
})

app.get('/', getHomePage);

function getHomePage(req, res) { 
  try {
    res.render('./index');
  } catch (error) {
    console.error(error);
  }
}