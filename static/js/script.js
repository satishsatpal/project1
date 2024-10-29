
/* module for importing other js files */
function include(file) {
  const script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}


// Bot pop-up intro
document.addEventListener("DOMContentLoaded", () => {
  const elemsTap = document.querySelector(".tap-target");
  // eslint-disable-next-line no-undef
  const instancesTap = M.TapTarget.init(elemsTap, {});
  instancesTap.open();
  setTimeout(() => {
    instancesTap.close();
  }, 1000);
});

/* import components */
//include('http://18.223.47.186:8080/ChatBot/static/js/components/index.js');
include('./static/js/components/index.js');

window.addEventListener('load', () => {
  // initialization
  $(document).ready(() => {
    // Bot pop-up intro
    $("div").removeClass("tap-target-origin");

    // drop down menu for close, restart conversation & clear the chats.
    $(".dropdown-trigger").dropdown();

    // initiate the modal for displaying the charts,
    // if you dont have charts, then you comment the below line
    $(".modal").modal();

    // enable this if u have configured the bot to start the conversation.
    showBotTyping();
    $("#userInput").prop('disabled', true);

    // if you want the bot to start the conversation
    customActionTrigger();
  });
  // Toggle the chatbot screen
  $("#profile_div").click(() => {
    $(".profile_div").toggle();
    $(".widget").toggle();
  });

  // clear function to clear the chat contents of the widget.
  $("#clear").click(() => {
    $(".chats").fadeOut("normal", () => {
      $(".chats").html("");
      $(".chats").fadeIn();
    });
  });

  // close function to close the widget.
  $("#close").click(() => {
    $(".profile_div").toggle();
    $(".widget").toggle();
    scrollToBottomOfResults();
  });
});

function listen() {
    let mic = document.getElementById('mic');
    mic.style.color = 'red';
    mic.className = 'animated pulse infinite';
    let hear = new webkitSpeechRecognition();
    hear.continuous = false;
    hear.lang = 'en-IN';
    hear.start();
    hear.onresult = function (e) {
    mic.style.color = 'black';
    mic.className = '';
    userVoiceText = e.results[0][0].transcript;
    hear.stop();
    createSender(userVoiceText);
    respond(userVoiceText);
    }
    hear.addEventListener("error", (event) => {
  console.error(`Speech recognition error detected: ${event.error}`);
});
}

function speak(msg) {
    var speech = new SpeechSynthesisUtterance(msg);
    speech.voice = speechSynthesis.getVoices()[5];
    window.speechSynthesis.speak(speech);
}

function voice() {
    let speaker = document.getElementById('voice').checked;
    if (speaker == true)
        return true;
    else
        return false;
}


function respond(msg) {
    data = {
        sender:"default",
        message: msg,
    }
    fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(function (response) {
            document.getElementById('typing').style.display = "none";
            return response.json();
        })
        .then(function (responses) {
            console.log(responses);
            if (responses) {
                for (let response of responses) {
                    createResponder(response);
            }
            } else {
                createResponder({text: "Sorry, I'm having trouble understanding you, try asking me in an other way"})
            }

        })
        .catch(function (err) {
            // document.getElementById('typing').style.display = "none";
            createResponder({text: "I'm having some technical issues. Try again later :)"});
        });
}
function createSender(msg) {

	document.getElementById("userInput").value = msg

document.getElementById("sendButton").click()

        /*let li = document.createElement('li');
        li.appendChild(document.createTextNode(msg));
        li.className = "sender"
        ul.appendChild(li);
        document.getElementById('chat-input').value = "";
        chat.scrollTop = chat.scrollHeight;
        if(msg === '/restart') {
            $('#conversation').empty();
            let li = document.createElement('li');
            li.appendChild(document.createTextNode("Greetings and welcome to Telenor. How may I help you ?"));
            li.className = "responder";
            ul.appendChild(li);
        }
        */
}

function createResponder(msg) {
	speak(msg.text);
    /*let li = document.createElement('li');
    if (msg.custom) {
        var image = document.createElement('img');
        image.src = msg.custom.image_url;
        li.innerHTML = image;
        image.className = 'responder';
        ul.appendChild(image);
          setTimeout(function(){  
        chat.scrollTop = chat.scrollHeight; 
    }, 150);
    } else if(msg.text) {
        li.innerHTML = msg.text;
        if (voice() == true)
            speak(li.innerText);
        li.className = 'responder';
        ul.appendChild(li);
         chat.scrollTop = chat.scrollHeight; 
    }*/
}

function speak(msg) {
    var speech = new SpeechSynthesisUtterance(msg);
    speech.voice = speechSynthesis.getVoices()[5];
    window.speechSynthesis.speak(speech);
}
