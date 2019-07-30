'use strict';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// recognition.interimResults = true;
const recognition2 = new SpeechRecognition();
// recognition2.interimResults = true;
const languagesCode = {
  Chinese: 'zh',
  English: 'en',
  French: 'fr',
  German: 'de',
  Italian: 'it',
  Japanese: 'ja',
  Korean: 'ko',
  Russian: 'ru',
  Spanish: 'es',
  Thai: 'th',
  Vietnamese: 'vi'
};

let firstSelectedLanguageCode = '';
let secondSelectedLanguageCode = '';

let savedTranscript = {
  originalTranscript: '',
  translatedTranscript: '',
  originalLanguage: '',
  translatedLanguage: ''
};

populateLanguageDropDownMenu();

recognition.onstart = function() {
  console.log('first language voice is recording');
};

recognition2.onstart = function() {
  console.log('second language voice is recording');
};

recognition.onresult = function(event) {
  const index = event.resultIndex;
  const transcript = event.results[index][0].transcript;
  savedTranscript.originalTranscript = transcript;
  $.ajax({
    method: 'GET',
    url: '/translate',
    data: {transcript: transcript, language: secondSelectedLanguageCode},
    cache: false,
    success: function(data) {
      savedTranscript.translatedTranscript = data[0];
      talk(data[0]);
      $('.firstWords').text(transcript);
      $('.secondWords').text(data);
    }
  });
};

recognition2.onresult = function(event) {
  const index = event.resultIndex;
  const transcript = event.results[index][0].transcript;
  savedTranscript.originalTranscript = transcript;
  $.ajax({
    method: 'GET',
    url: '/translate',
    data: {transcript: transcript, language: firstSelectedLanguageCode},
    cache: false,
    success: function(data) {
      savedTranscript.translatedTranscript = data[0];
      talk(data[0]);
      $('.firstWords').text(data);
      $('.secondWords').text(transcript);
    }
  });
};

$('.firstTalk').click(() => {
  const selectedLanguages = getLanguages();
  savedTranscript.originalLanguage = selectedLanguages[0];
  savedTranscript.translatedLanguage = selectedLanguages[1];
  recognition.lang = firstSelectedLanguageCode;
  recognition.start();
});

$('.secondTalk').click(() => {
  const selectedLanguages = getLanguages();
  savedTranscript.originalLanguage = selectedLanguages[1];
  savedTranscript.translatedLanguage = selectedLanguages[0];
  recognition2.lang = secondSelectedLanguageCode;
  recognition2.start();
});

$('.save').click(() => {
  $.ajax({
    method: 'POST',
    url: '/transcript',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      originalTranscript: savedTranscript.originalTranscript,
      translatedTranscript: savedTranscript.translatedTranscript,
      originalLanguage: savedTranscript.originalLanguage,
      translatedLanguage: savedTranscript.translatedLanguage
    },
    success: function(data) {
      console.log('save to SQL successful');
    }
  });
});

$('.delete').click((event) => {
  const id = $(event.target).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/saved/${id}`
  });
});

function talk(transcript) {
  const speech = new SpeechSynthesisUtterance();
  speech.transcript = transcript;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

function getLanguages() {
  let firstSelectedLanguage = $('#firstLanguages option:selected').text();
  firstSelectedLanguageCode = languagesCode[firstSelectedLanguage];
  let secondSelectedLanguage = $('#secondLanguages option:selected').text();
  secondSelectedLanguageCode = languagesCode[secondSelectedLanguage];
  return [firstSelectedLanguage, secondSelectedLanguage];
}

function populateLanguageDropDownMenu() {
  $.ajax({
    method: 'GET',
    url: '/languages',
    success: function(data) {
      data.forEach(language => {
        $('#firstLanguages').append(`<option>${language.name}</option>`);
        $('#secondLanguages').append(`<option>${language.name}</option>`);
      });
    }
  });
}

function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

