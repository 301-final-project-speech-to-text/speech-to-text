'use strict';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'vi-US';

recognition.onstart = function() { 
  console.log('voice is recording');
}

recognition.onresult = function(event) { 
  console.log('got in');
  const index = event.resultIndex;
  const transcript = event.results[index][0].transcript;
  $.ajax({
    method: 'GET',
    url: '/translate',
    data: {data: transcript},
    cache: false,
    success: function(data) { 
      talk(data);
      $('.firstWords').text(data);
    }
  });
};

$('.firstTalk').click(() => {
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
