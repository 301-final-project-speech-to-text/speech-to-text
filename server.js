'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT);
})

app.get('/', getHomePage);
app.get('/about', getAboutPage);
app.get('/saved', getSavedPhrases);
app.get('/users', getUsersList);
app.post('/users', saveUsers);
app.delete('/saved/:id', deleteSavedPhrases);
app.get('/translate', translateHandler);
app.get('/languages', getLanguagesHandler);
app.post('/transcript', saveToDatabase);

function getHomePage(req, res) { 
  try {
    res.render('./index');
  } catch (error) {
    console.error(error);
  }
}

function getAboutPage(req, res) { 
  try { 
    res.render('./about-us');
  } catch (error) { 
    console.log(error);
  }
}

/////////////////////////////////////////////// GOOGLE SPEECH TO TEXT ///////////////////////////////////////////////////////////

// const speech = require('@google-cloud/speech');
// const client = new speech.SpeechClient();
// const recorder = require('node-record-lpcm16');
// const encoding = 'LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'en-US';

// const request = { 
//   config: { 
//     encoding: encoding,
//     sampleRateHertz: sampleRateHertz,
//     languageCode: languageCode,
//   },
//   interimResults: false,
// };

// const recognizeStream = client
//   .streamingRecognize(request)
//   .on('error', console.error)
//   .on('data', data => 
//     process.stdout.write(
//       data.results[0] && data.results[0].alternatives[0]
//         ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//         : `\n\nReached transcription time limit, press Ctrl+C\n`
//     )
//   );

// recorder
//   .record({
//     sampleRateHertz: sampleRateHertz,
//     threshold: 0,
//     verbose: false,
//     recordProgram: 'rec', 
//     silence:'10.0',
//   })
//   .stream()
//   .on('error', console.error)
//   .pipe(recognizeStream);

// console.log('Listening, press Ctrl+C to stop.');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////// GOOGLE TRANSLATE ///////////////////////////////////////////////////////

const {Translate} = require('@google-cloud/translate');
const translate = new Translate();


function translateHandler(req, res) { 
  const transcript = req.query.transcript;
  const language = req.query.language;
  console.log('transcript: ', transcript);
  console.log('language :', language);
  console.log(req.query);
  translateText(transcript, language)
    .then(translation => res.send(translation));
}

async function translateText(text, target) { 
  try {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
    return translations;
  } catch (error) {
    console.error(error);
  }
}

async function getLanguagesHandler(req, res) { 
  const SQL = 'SELECT name FROM lang;';

  const result = await client.query(SQL);
  const languages = result.rows;
  res.send(languages);
}

async function saveToDatabase(req, res) { 
  const SQL = `
  INSERT INTO trans (string, translation, lang_name_id, lang_trans_name_id, user_id) 
  VALUES ($1, $2, (select id
  from lang where name = $3
  ), (select id
  from lang where name = $4), 
  (select id from users where users.name=$5));`;

  console.log(req.body);
  const values = [req.body.originalTranscript, req.body.translatedTranscript, req.body.originalLanguage, req.body.translatedLanguage, req.body.username];
  client.query(SQL, values);
}

async function getSavedPhrases(req, res) { 
  const SQL = `
  SELECT trans.id, string, translation, l1.code AS original, l2.code AS translated FROM trans 
  JOIN lang l1 ON lang_name_id = l1.id
  JOIN lang l2 ON lang_trans_name_id = l2.id
  JOIN users ON trans.user_id = users.id 
  WHERE users.name = $1;`;

  const value = [req.query.username]
  console.log(value);
  const result = await client.query(SQL, value);
  const savedPhrases = result.rows;
  console.log(savedPhrases);
  res.render('savedPhrases', {savedPhrases: savedPhrases});
}

function deleteSavedPhrases(req, res) {
  const SQL = 'DELETE FROM trans WHERE id=$1;';
  const value = [req.params.id];
  console.log(req.params);
  client.query(SQL, value);
}

async function getUsersList(req, res) { 
  const SQL = 'SELECT name FROM users';
  const result = await client.query(SQL);
  let usersList = result.rows;
  res.send(usersList.map(object => Object.values(object)[0]));
}

function saveUsers(req, res) { 
  const SQL = 'INSERT INTO users (name) VALUES ($1);';
  console.log(req.body.username);
  const value = [req.body.username];
  client.query(SQL, value);
}