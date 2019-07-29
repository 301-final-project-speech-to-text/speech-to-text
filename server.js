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
app.post('/translate', translateHandler);

function getHomePage(req, res) { 
  try {
    res.render('./index');
  } catch (error) {
    console.error(error);
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
  console.log(req.data);
  const transcript = req.data.transcript;
  const language = 'es';
  console.log(transcript);
  translateText(transcript, language)
    .then(translation => res.send(translation));
}

async function translateText(text, target) { 
  try {
    let [translations] = await translate.translate(text, 'vi');
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