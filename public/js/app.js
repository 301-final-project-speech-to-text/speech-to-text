'use strict';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() { 
  console.log('voice is recording');
}

recognition.onresult = function(event) { 
  const index = event.resultIndex;
  const text = event.results[index][0].transcript;
  talk(text);
  $('.words').text(text);
}

$('.talk').click(() => {
  recognition.start();
})

function talk(transcript) { 
  const speech = new SpeechSynthesisUtterance();
  speech.text = transcript;
  speech.volume = 1;
  speech.rate = 1; 
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}