// // Get the Messenger icon and chat popup
// const messengerIcon = document.getElementById('messenger-icon');
// const chatPopup = document.getElementById('chat-popup');

// // Toggle the chat popup when Messenger icon is clicked
// messengerIcon.addEventListener('click', function (event) {
//     event.stopPropagation(); // Prevent click event from propagating to the document
//     chatPopup.classList.toggle('active');
// });

// // Hide the chat popup when clicking outside
// document.addEventListener('click', function (event) {
//     if (!chatPopup.contains(event.target) && !messengerIcon.contains(event.target)) {
//         chatPopup.classList.remove('active');
//     }
// });

// // Stop the click event inside the popup from closing the popup
// chatPopup.addEventListener('click', function (event) {
//     event.stopPropagation();
// });

// const userChats = document.querySelectorAll('.user-chat');
// const chatMessages = document.querySelectorAll('.content-chat-message-user');

// // Handle user chat selection
// userChats.forEach((userChat) => {
//     userChat.addEventListener('click', () => {
//         const selectedUsername = userChat.getAttribute('data-username');

//         chatMessages.forEach((chatMessage) => {
//             const messageUsername = chatMessage.getAttribute('data-username');

//             // Only toggle the visibility of the selected chat
//             if (messageUsername === selectedUsername) {
//                 chatMessage.classList.toggle('active');
//                 chatPopup.classList.remove('active');
//             }
//         });
//     });
// });

// // Messaging functionality
// function handleMessaging(formSelector, inputSelector, chatSelector, username) {
//     const msgerForm = get(formSelector);
//     const msgerInput = get(inputSelector);
//     const msgerChat = get(chatSelector);

//     msgerForm.addEventListener("submit", event => {
//         event.preventDefault();

//         const msgText = msgerInput.value;
//         if (!msgText) return;

//         appendMessage(username, PERSON_IMG, "right", msgText, msgerChat);
//         msgerInput.value = "";

//         botResponse(msgerChat); // Simulate bot response per chat
//     });
// }

// // Attach message handling to each chat window
// chatMessages.forEach(chatMessage => {
//     const username = chatMessage.getAttribute('data-username');
//     handleMessaging(`.content-chat-message-user[data-username="${username}"] .msger-inputarea`, 
//                     `.content-chat-message-user[data-username="${username}"] .msger-input`, 
//                     `.content-chat-message-user[data-username="${username}"] .msger-chat`, 
//                     username);
// });

// function appendMessage(name, img, side, text, chatElement) {
//     const msgHTML = `
//         <div class="msg ${side}-msg">
//             <div class="msg-img"></div>
//             <div class="msg-bubble">
//                 <div class="msg-info">
//                     <div class="msg-info-name">${name}</div>
//                     <div class="msg-info-time">${formatDate(new Date())}</div>
//                 </div>
//                 <div class="msg-text">${text}</div>
//             </div>
//         </div>
//     `;

//     chatElement.insertAdjacentHTML("beforeend", msgHTML);
//     setTimeout(() => {
//         chatElement.scrollTop = chatElement.scrollHeight;
//     }, 100);
// }

// function botResponse(chatElement) {
//     const r = random(0, BOT_MSGS.length - 1);
//     const msgText = BOT_MSGS[r];
//     const delay = msgText.split(" ").length * 100;

//     setTimeout(() => {
//         appendMessage(BOT_NAME, BOT_IMG, "left", msgText, chatElement);
//     }, delay);
// }

// function get(selector, root = document) {
//     return root.querySelector(selector);
// }

// function formatDate(date) {
//     const h = "0" + date.getHours();
//     const m = "0" + date.getMinutes();

//     return `${h.slice(-2)}:${m.slice(-2)}`;
// }

// function random(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }
const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
  ];


  const BOT_NAME = "BOT";
 
// Get the Messenger icon and chat popup
const messengerIcon = document.getElementById('messenger-icon');
const chatPopup = document.getElementById('chat-popup');

// Toggle the chat popup when Messenger icon is clicked
messengerIcon.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    chatPopup.classList.toggle('active');
});

// Hide the chat popup when clicking outside
document.addEventListener('click', function (event) {
    if (!chatPopup.contains(event.target) && !messengerIcon.contains(event.target)) {
        chatPopup.classList.remove('active');
    }
});

// Stop the click event inside the popup from closing the popup
chatPopup.addEventListener('click', function (event) {
    event.stopPropagation();
});

// Function to manage multiple chat windows
function handleMessagingForChat(username) {
    const chatWindow = document.querySelector(`.content-chat-message-user[data-username="${username}"]`);
    const msgerForm = chatWindow.querySelector('.msger-inputarea');
    const msgerInput = chatWindow.querySelector('.msger-input');
    const msgerChat = chatWindow.querySelector('.msger-chat');

    msgerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const msgText = msgerInput.value;
        if (!msgText) return;

        appendMessage(username,"right", msgText, msgerChat);
        msgerInput.value = "";

        botResponse(msgerChat); // Simulate bot response per chat
    });
}

// Handle user chat selection
const userChats = document.querySelectorAll('.user-chat');
const chatMessages = document.querySelectorAll('.content-chat-message-user');

userChats.forEach((userChat) => {
    userChat.addEventListener('click', () => {
        const selectedUsername = userChat.getAttribute('data-username');
        
        // Activate the corresponding chat window and allow messaging
        chatMessages.forEach((chatMessage) => {
            const messageUsername = chatMessage.getAttribute('data-username');
            
            if (messageUsername === selectedUsername) {
                chatMessage.classList.add('active');
                chatPopup.classList.remove('active');
                
                // Initialize messaging for the selected chat
                handleMessagingForChat(selectedUsername);
            }
        });
    });
});

// Messaging functionality for each active chat
function appendMessage(name, side, text, chatElement) {
    const msgHTML = `
        <div class="msg ${side}-msg">
            <div class="msg-img"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${formatDate(new Date())}</div>
                </div>
                <div class="msg-text">${text}</div>
            </div>
        </div>
    `;

    chatElement.insertAdjacentHTML("beforeend", msgHTML);
    setTimeout(() => {
        chatElement.scrollTop = chatElement.scrollHeight;
    }, 100);
}

function botResponse(chatElement) {
   
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
        appendMessage(BOT_NAME, "left", msgText, chatElement);
    }, delay);
}

// Utility functions
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
