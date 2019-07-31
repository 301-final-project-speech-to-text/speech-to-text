'use strict';

/* #region Chat Room for User */

$('#chatForm').fadeIn();
populateLanguageDropDownMenu();

function getChatRoom(event) { 
  event.preventDefault();
  const preferredLanguage = $('#preferredLanguage option:selected').text();
  localStorage.setItem('preferredLanguage', preferredLanguage);
  $('#chatForm').fadeOut();
}

function populateLanguageDropDownMenu() {
  $.ajax({
    method: 'GET',
    url: '/languages',
    success: function(data) {
      data.forEach(language => {
        $('#preferredLanguage').append(`<option>${language.name}</option>`);
      });
    }
  });
}

$('#preferredLanguageSubmit').click(getChatRoom);

/* #region Chat Room */

const $inputMessage = $('#chatMessage');
const $messageWindow = $('.messages');
const username = localStorage.getItem('username');
let connected = false;
let typing = false;
const socket = io();

//////////////////////////// HELPER FUNCTIONS ////////////////////////

function sendMessage() { 
  const message = $inputMessage.val();
  if (message && connected) { 
    addChatMessage({

    })
  }
}

function addChatMessage(message) { 
  
}



///////////////////////// KEYBOARD EVENTS //////////////////////////

$('chatMessageForm').on('submit', () => {
  sendMessage();
  socket.emit('stop typing');
  typing = false;
})

$inputMessage.on('input', ()=> { 
  updateTyping();
})