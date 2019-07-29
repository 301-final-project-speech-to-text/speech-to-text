'use strict';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() { 
  console.log('voice is recording');
}

recognition.onresult = function(event) { 
  console.log('got in');
  const index = event.resultIndex;
  const transcript = event.results[index][0].transcript;
  console.log(event);
  // $.ajax({
  //   type: 'POST',
  //   url: '/translate',
  //   data: {transcript: transcript},
  //   success: function(data) { 
  //     talk(data);
  //     $('.words').transcript(data);
  //   }
  // });
};

$('.talk').click(() => {
  recognition.start();
});

function talk(transcript) { 
  const speech = new SpeechSynthesisUtterance();
  speech.transcript = transcript;
  speech.volume = 1;
  speech.rate = 1; 
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}