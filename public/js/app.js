'use strict';

/* #region Local Storage for user */
// Alert user to submit their name. Store their name in local storage. Store in name: 'value'.

//Local storage global variables
checkUser();
$('#user').text(showUsername());
loadHTMLSavePage();
//User login and interaction with local storage

function checkUser() { 
  if (!localStorage.username) { 
    $('#user-login').show();
    $('user-signup').hide();
  } else { 
    $('#user-login').hide();
    $('#user-signup').hide();
  }
}

async function validateUserSignUp(event) { 
  event.preventDefault();
  const usernameToValidate = document.querySelector('#userNameSignup');
  const usernameInput = $('#userNameSignup').val();
  let validate = false;
  
  await $.ajax({
    method: 'GET',
    url: '/users',
    success: function(data) { 
      console.log(data);
      if (!data.includes(usernameInput)) {
        validate = true;
      }
    }
  })
  if (validate === false) { 
    usernameToValidate.setCustomValidity('This username is already taken');
  } else {
    localStorage.setItem('username', `${usernameInput}`);
    addUser(usernameInput);
    $('#user').text(showUsername());
    $('#user-login').hide();
    $('#user-signup').hide();
  }
}


async function validateUserLogin(event) { 
  event.preventDefault();
  const newUser = document.querySelector('#userNameLogin');
  const usernameInput = $('#userNameLogin').val();
  let validate = false;

  await $.ajax({
    method: 'GET',
    url: '/users',
    success: function(data) { 
      console.log(data);
      if (data.includes(usernameInput)) {
        validate = true;
      }
    }
  })
  if (validate === false) { 
    newUser.setCustomValidity('Looks like we haven\'t met yet! Please create your username at the sign-in link below.');
  } else {
    localStorage.setItem('username', `${usernameInput}`);
    $('#user').text(showUsername());
    $('#user-login').hide();
    $('#user-signup').hide();
  }
}

function addUser(username) { 
  $.ajax({
    method: 'POST',
    url: '/users',
    contentType: 'application/x-www-form-urlencoded',
    data: {username: username}
  })
}

function getSignUpPage() { 
  $('#user-login').hide();
  $('#user-signup').show();
}

function showUsername() { 
  return localStorage.getItem('username');
}

$('#userLogin').on('submit', validateUserLogin);
$('#userSignup').on('submit', validateUserSignUp);
$('#signUpPage').click(getSignUpPage);

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
      $('i.firstTalk').css('animation','');
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
      $('i.secondTalk').css('animation','');
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
  $('i.firstTalk').css('animation','recording 2s infinite');
});

//
$('.secondTalk').click(() => {
  const selectedLanguages = getLanguages();
  savedTranscript.originalLanguage = selectedLanguages[1];
  savedTranscript.translatedLanguage = selectedLanguages[0];
  recognition2.lang = secondSelectedLanguageCode;
  recognition2.start();
  $('i.secondTalk').css('animation','recording 2s infinite');
});

//
$('.save').click(() => {
  const currentUser = localStorage.getItem('username');
  console.log(savedTranscript.originalTranscript);
  if (savedTranscript.originalTranscript !== '' || savedTranscript.translatedTranscript !== '') {
    $('#saveConfirmMessage').fadeIn(500);
    $('#saveConfirmMessage').fadeOut(500);
    $.ajax({
      method: 'POST',
      url: '/transcript',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        originalTranscript: savedTranscript.originalTranscript,
        translatedTranscript: savedTranscript.translatedTranscript,
        originalLanguage: savedTranscript.originalLanguage,
        translatedLanguage: savedTranscript.translatedLanguage,
        username: currentUser
      },
      success: function(data) {
        console.log('save to SQL successful');
      }
    });
  } 
  clearPhrase();
});

$('#clear').click(clearPhrase)

function clearPhrase() { 
  $('.firstWords').text('');
  $('.secondWords').text('');
}

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

function showDropdown() {
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
}

async function loadHTMLSavePage() { 
  console.log(window.location.pathname.slice(-5));
  if (window.location.pathname.slice(-5) === 'saved') {
    const username = localStorage.getItem('username');
    let validate = false;
  
    await $.ajax({
      method: 'POST',
      url: '/saved',
      contentType: 'application/x-www-form-urlencoded',
      data: {username: username},
      success: (html) => {
        $('nav').after(html);
        // if () {$('nav').after('You dont have any saved phrases')}
      }
    })
  }
}

$('#signOut').click((event) => {
  localStorage.clear();
  window.location.replace('/');
})

function deleteTrans(id) {
  $.ajax({
    method: 'DELETE',
    url: `/saved/${id}`
  });
  $(`.delete[data-id=${id}]`).parent().remove();
}

$('#hideTeam').click(function(){
  $('#team-desc').hide(1);
});
