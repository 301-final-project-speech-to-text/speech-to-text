'use strict';

/* #region Local Storage for user */
// Alert user to submit their name. Store their name in local storage. Store in name: 'value'.

//Local storage global variables
var userName='';
var currentUser = '';

var currentUser = localStorage.Current;
console.log(currentUser, 'Do we have a currentUser?');

function User(name) {
  this.name = name;
}

//User login and interaction with local storage
var form = document.getElementById('userLogin');

var addUser = function(event) {
  event.preventDefault();
  var userEntry = event.target.userName.value;
  if (localStorage.userEntry) {
    userName = localStorage.userEntry;
    currentUser = userName;
  } else {
    userName = event.target.userName.value;
    currentUser = userName;
    localStorage.setItem('Current', currentUser);
    localStorage.setItem(`'${userName}'`, userName);
  }
  //insert code to hide the login section
};

form.addEventListener('submit', addUser);

/* #endregion Local Storage */

//Constructor function that checks whether or not the browser supports the language interface
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// recognition.interimResults = true;
const recognition2 = new SpeechRecognition();
// recognition2.interimResults = true;

//Object of language codes to interact with the API and the user's language selection
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

//Assigning empty strings for the two language input windows
let firstSelectedLanguageCode = '';
let secondSelectedLanguageCode = '';

//Assigning empty strings for the original and translated transcripts and the original and translated language selection
let savedTranscript = {
  originalTranscript: '',
  translatedTranscript: '',
  originalLanguage: '',
  translatedLanguage: ''
};

//Populate the language selection drop down menu
populateLanguageDropDownMenu();

//Notification to track user's use of the top recording button
recognition.onstart = function() {
  console.log('first language voice is recording');
};

//Notification to track user's use of the bottom recording button
recognition2.onstart = function() {
  console.log('second language voice is recording');
};

//When the user speaks into the top recording window, save the transcript, get the translation from the API, and display the two strings
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

//When the user speaks into the bottom recording window, save the transcript, get the translation from the API, and display the two strings
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

//
$('.firstTalk').click(() => {
  const selectedLanguages = getLanguages();
  savedTranscript.originalLanguage = selectedLanguages[0];
  savedTranscript.translatedLanguage = selectedLanguages[1];
  recognition.lang = firstSelectedLanguageCode;
  recognition.start();
});

//
$('.secondTalk').click(() => {
  const selectedLanguages = getLanguages();
  savedTranscript.originalLanguage = selectedLanguages[1];
  savedTranscript.translatedLanguage = selectedLanguages[0];
  recognition2.lang = secondSelectedLanguageCode;
  recognition2.start();
});

//
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

//
$('.delete').click((event) => {
  const id = $(event.target).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/saved/${id}`
  });
});

//
function talk(transcript) {
  const speech = new SpeechSynthesisUtterance();
  speech.transcript = transcript;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

//
function getLanguages() {
  let firstSelectedLanguage = $('#firstLanguages option:selected').text();
  firstSelectedLanguageCode = languagesCode[firstSelectedLanguage];
  let secondSelectedLanguage = $('#secondLanguages option:selected').text();
  secondSelectedLanguageCode = languagesCode[secondSelectedLanguage];
  return [firstSelectedLanguage, secondSelectedLanguage];
}

//
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
