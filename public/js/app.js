'use strict';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const recognition2 = new SpeechRecognition();
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

recognition.onstart = function() { 
  console.log('first language voice is recording');
};

recognition2.onstart = function() { 
  console.log('second language voice is recording');
};

recognition.onresult = function(event) { 
  const index = event.resultIndex;
  const transcript = event.results[index][0].transcript;
  $.ajax({
    method: 'GET',
    url: '/translate',
    data: {transcript: transcript, language: secondSelectedLanguageCode},
    cache: false,
    success: function(data) { 
      talk(data);
      $('.firstWords').text(transcript);
      $('.secondWords').text(data);
    }
  });
};

recognition2.onresult = function(event) { 
  const index = event.resultIndex;
  const transcript = event.results[index][0].transcript;
  getLanguages();
  recognition.lang = secondSelectedLanguageCode;
  $.ajax({
    method: 'GET',
    url: '/translate',
    data: {transcript: transcript, language: firstSelectedLanguageCode},
    cache: false,
    success: function(data) { 
      talk(data);
      $('.firstWords').text(data);
      $('.secondWords').text(transcript);
    }
  });
};

$('.firstTalk').click(() => {
  getLanguages();
  recognition.lang = firstSelectedLanguageCode;
  recognition.start();
});

$('.secondTalk').click(() => {
  getLanguages();
  recognition2.lang = secondSelectedLanguageCode;
  recognition2.start();
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
  console.log('second language: ', secondSelectedLanguage);
  secondSelectedLanguageCode = languagesCode[secondSelectedLanguage];
  console.log('second language code: ', secondSelectedLanguageCode);
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

