// const BOT_MSGS = [
//     "Hi, how are you?",
//     "Ohh... I can't understand what you are trying to say. Sorry!",
//     "I like to play games... But I don't know how to play!",
//     "Sorry if my answers are not relevant. :))",
//     "I feel sleepy! :(",
//     "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
// ];

// const BOT_NAME = "BOT";
// let activeChats = []; // To track active chat windows
// let minimizedChats = []; // To track minimized chat windows

// // Toggle the chat popup when Messenger icon is clicked
// $('#messenger-icon').on('click', function (event) {
//     event.stopPropagation();
//     $('#chat-popup').toggleClass('active');
// });

// // Hide the chat popup when clicking outside
// $(document).on('click', function (event) {
//     if (!$('#chat-popup').is(event.target) && !$('#messenger-icon').is(event.target) && $('#chat-popup').has(event.target).length === 0) {
//         $('#chat-popup').removeClass('active');
//     }
// });

// // Stop the click event inside the popup from closing the popup
// $('#chat-popup').on('click', function (event) {
//     event.stopPropagation();
// });

// // Function to manage dynamic positioning of active chat windows
// function updateChatPositions() {
//     const baseRightPosition = 80; // Starting right position for the first chat window
//     const chatWidth = 350; // Adjust based on your chat window's width
//     const gap = 0; // Gap between chat windows

//     activeChats.forEach((username, index) => {
//         const chatWindow = $(`.content-chat-message-user[data-username="${username}"]`);
//         const rightPosition = baseRightPosition + (index * (chatWidth + gap));
//         chatWindow.css('right', `${rightPosition}px`);
//     });
// }

// // Function to handle messaging for each chat window
// function handleMessagingForChat(username) {
//     const chatWindow = $(`.content-chat-message-user[data-username="${username}"]`);
//     const msgerForm = chatWindow.find('.msger-inputarea');
//     const msgerInput = chatWindow.find('.msger-input');
//     const msgerChat = chatWindow.find('.msger-chat');

//     msgerForm.on("submit", function (event) {
//         event.preventDefault();

//         const msgText = msgerInput.val();
//         if (!msgText) return;

//         appendMessage(username, "right", msgText, msgerChat);
//         msgerInput.val("");
//         botResponse(msgerChat);
//     });
// }

// // Handle user chat selection
// $('.user-chat').on('click', function () {
//     const selectedUsername = $(this).attr('data-username');

//     // Activate the corresponding chat window and allow messaging
//     const chatWindow = $(`.content-chat-message-user[data-username="${selectedUsername}"]`);
//     const msgerChat = chatWindow.find('.msger-chat');
//     const msgerInputArea = chatWindow.find('.msger-inputarea');

//     if (!chatWindow.hasClass('active')) {
//         // Remove minimized circle if chat was minimized
//         const minimizedCircle = $(`.minimized-chat[data-username="${selectedUsername}"]`);
//         if (minimizedCircle.length) minimizedCircle.remove();
//         msgerChat.show();
//         msgerInputArea.show();
//         chatWindow.addClass('active');
//         activeChats.push(selectedUsername); // Add to active chats
//         updateChatPositions(); // Update positions of all active chats
//         handleMessagingForChat(selectedUsername);
//     }

//     $('#chat-popup').removeClass('active');
// });

// // Messaging functionality for each active chat
// function appendMessage(name, side, text, chatElement) {
//     let msg_img_text = `${side.charAt(0)}`;
//     let msg_img_text_upper = msg_img_text.toUpperCase();
//     const msgHTML = `
//         <div class="msg ${side}-msg">
//             <div class="msg-img">${msg_img_text_upper}</div>
//                <div class="${side}-msg-boby">
//                 <div class="msg-bubble"> 
//                     <div class="msg-text">${text}</div>
//                     </div>
//                     <div class="${side}-msg-time">${formatDate(new Date())}</div>   
//                 </div>
//         </div>
//     `;

//     chatElement.append(msgHTML);
//     setTimeout(() => {
//         chatElement.scrollTop(chatElement[0].scrollHeight);
//     }, 100);
// }

// function botResponse(chatElement) {
//     const r = random(0, BOT_MSGS.length - 1);
//     const msgText = BOT_MSGS[r];
//     const delay = msgText.split(" ").length * 100;

//     setTimeout(() => {
//         appendMessage(BOT_NAME, "left", msgText, chatElement);
//     }, delay);
// }

// // Utility functions
// function formatDate(date) {
//     const h = "0" + date.getHours();
//     const m = "0" + date.getMinutes();
//     return `${h.slice(-2)}:${m.slice(-2)}`;
// }

// function random(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// // Function to handle minimize, restore, and close actions for each chat window
// function handleChatWindowActions() {
//     $('.content-chat-message-user').each(function () {
//         const chatWindow = $(this);
//         const username = chatWindow.attr('data-username');
//         const minimizeBtn = chatWindow.find('.fa-minus');
//         const closeBtn = chatWindow.find('.fa-times');
//         let minimizedCircle;

//         // Minimize chat
//         minimizeBtn.on('click', function () {
//             const chatContent = chatWindow.find('.msger-chat');
//             const msgInputArea = chatWindow.find('.msger-inputarea');

//             // Hide chat content and input area
//             chatContent.hide();
//             msgInputArea.hide();

//             // Remove from active chats when minimized
//             const index = activeChats.indexOf(username);
//             if (index !== -1) activeChats.splice(index, 1);

//             chatWindow.removeClass('active');
//             updateChatPositions(); // Recalculate positions of remaining chats

//             // Check if a minimized circle already exists and remove it before creating a new one
//             const existingMinimizedCircle = $(`.minimized-chat[data-username="${username}"]`);
//             if (existingMinimizedCircle.length) {
//                 existingMinimizedCircle.remove();
//             }

//             // Create minimized circle with the user's initial
//             minimizedCircle = $('<div/>', {
//                 class: 'minimized-chat',
//                 'data-username': username,
//                 html: `
//                     <span></span>
//                     <span class="minimized-chat-shortname">${username.charAt(0)}</span>
//                     <span class="minimized-chat-tooltip">${username}</span>
//                     <span class="minimized-chat-btn">&times;</span>
//                 `
//             });

//             // Add minimized circle to the body and adjust its position dynamically
//             $('body').append(minimizedCircle);
//             minimizedChats.push(minimizedCircle);

//             adjustMinimizedChatPositions(); // Adjust the positions when a new chat is minimized

//             // Handle click on the minimized circle to restore chat
//             minimizedCircle.on('click', function (event) {
//                 if (!$(event.target).hasClass('minimized-chat-btn')) {
//                     chatContent.show();
//                     msgInputArea.show();
//                     chatWindow.addClass('active');
//                     minimizedCircle.remove();
//                     minimizedChats = minimizedChats.filter(chat => chat !== minimizedCircle);
//                     activeChats.push(username); // Add back to active chats
//                     updateChatPositions(); // Recalculate positions of all active chats
//                     adjustMinimizedChatPositions(); // Adjust positions after restoring
//                 }
//             });

//             // Handle click on the minimized-chat-btn to close the minimized circle
//             minimizedCircle.find('.minimized-chat-btn').on('click', function (event) {
//                 event.stopPropagation();
//                 minimizedCircle.remove(); // Remove this minimized circle
//                 minimizedChats = minimizedChats.filter(chat => chat !== minimizedCircle);
//                 adjustMinimizedChatPositions(); // Adjust positions after closing
//             });
//         });

//         // Close chat (hide instead of removing)
//         closeBtn.on('click', function () {
//             chatWindow.removeClass('active');
//             const index = activeChats.indexOf(username);
//             if (index !== -1) activeChats.splice(index, 1);
//             updateChatPositions(); // Recalculate positions after closing
//         });
//     });
// }

// // Function to adjust minimized chat circles' positions dynamically
// function adjustMinimizedChatPositions() {
//     const availableHeight = $(window).height(); // Get the available window height
//     const circleHeight = 50; // Height of each minimized circle (adjust if needed)
//     const gap = 10; // Gap between each minimized circle
//     const maxVisibleCircles = Math.floor((availableHeight - 40) / (circleHeight + gap)); // Maximum number of circles that can fit on the screen

//     minimizedChats.forEach((chat, index) => {
//         // If the number of minimized chats exceeds the visible space, limit their positions
//         if (index < maxVisibleCircles) {
//             const bottomPosition = 20 + (index * (circleHeight + gap)); // Adjust bottom dynamically
//             chat.css('bottom', `${bottomPosition}px`);
//             chat.css('right', '20px'); // Fix the right position
//         } else {
//             // Hide extra minimized circles that don't fit on the screen
//             chat.hide();
//         }
//     });
// }

// // Adjust positions when window is resized to account for dynamic screen height
// $(window).on('resize', function () {
//     adjustMinimizedChatPositions();
// });

// // Initialize chat window actions when the page loads
// $(document).ready(function () {
//     handleChatWindowActions();
// });


const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you are trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
];

const BOT_NAME = "BOT";
let activeChats = []; // To track active chat windows
let minimizedChats = []; // To track minimized chat windows
const MAX_VISIBLE_CHATS = 3; // Maximum number of visible chats at a time

// Toggle the chat popup when Messenger icon is clicked
$('#messenger-icon').on('click', function (event) {
    event.stopPropagation();
    $('#chat-popup').toggleClass('active');
});

// Hide the chat popup when clicking outside
$(document).on('click', function (event) {
    if (!$('#chat-popup').is(event.target) && !$('#messenger-icon').is(event.target) && $('#chat-popup').has(event.target).length === 0) {
        $('#chat-popup').removeClass('active');
    }
});

// Stop the click event inside the popup from closing the popup
$('#chat-popup').on('click', function (event) {
    event.stopPropagation();
});

// Function to manage dynamic positioning of active chat windows
function updateChatPositions() {
    const baseRightPosition = 80; // Starting right position for the first chat window
    const chatWidth = 350; // Adjust based on your chat window's width
    const gap = 0; // Gap between chat windows

    // Ensure only the last MAX_VISIBLE_CHATS are visible
    activeChats.slice(0, MAX_VISIBLE_CHATS).forEach((username, index) => {
        const chatWindow = $(`.content-chat-message-user[data-username="${username}"]`);
        const rightPosition = baseRightPosition + (index * (chatWidth + gap));
        chatWindow.css('right', `${rightPosition}px`);
    });
}

// Handle user chat selection
$('.user-chat').on('click', function () {
    const selectedUsername = $(this).attr('data-username');

    // Activate the corresponding chat window and allow messaging
    const chatWindow = $(`.content-chat-message-user[data-username="${selectedUsername}"]`);
    const msgerChat = chatWindow.find('.msger-chat');
    const msgerInputArea = chatWindow.find('.msger-inputarea');

    if (!chatWindow.hasClass('active')) {
        // If there are already 3 active chats, minimize the first one
        if (activeChats.length >= MAX_VISIBLE_CHATS) {
            const oldestChatUsername = activeChats[0]; // Get the first (oldest) active chat
            minimizeChat(oldestChatUsername); // Minimize the first chat automatically
        }

        // Remove minimized circle if chat was minimized
        const minimizedCircle = $(`.minimized-chat[data-username="${selectedUsername}"]`);
        if (minimizedCircle.length) minimizedCircle.remove();
        msgerChat.show();
        msgerInputArea.show();
        chatWindow.addClass('active');
        activeChats.push(selectedUsername); // Add to active chats
        updateChatPositions(); // Update positions of all active chats
        handleMessagingForChat(selectedUsername);
    }

    $('#chat-popup').removeClass('active');
});

// Function to minimize chat programmatically
function minimizeChat(username) {
    const chatWindow = $(`.content-chat-message-user[data-username="${username}"]`);
    const chatContent = chatWindow.find('.msger-chat');
    const msgInputArea = chatWindow.find('.msger-inputarea');
    
    // Hide chat content and input area
    chatContent.hide();
    msgInputArea.hide();

    // Remove from active chats when minimized
    const index = activeChats.indexOf(username);
    if (index !== -1) activeChats.splice(index, 1);

    chatWindow.removeClass('active');
    updateChatPositions(); // Recalculate positions of remaining chats

    // Create minimized circle if it doesn't exist
    let minimizedCircle = $(`.minimized-chat[data-username="${username}"]`);
    if (!minimizedCircle.length) {
        minimizedCircle = $('<div/>', {
            class: 'minimized-chat',
            'data-username': username,
            html: `
                <span></span>
                <span class="minimized-chat-shortname">${username.charAt(0)}</span>
                <span class="minimized-chat-tooltip">${username}</span>
                <span class="minimized-chat-btn">&times;</span>
            `
        });

        // Add minimized circle to the body and adjust its position dynamically
        $('body').append(minimizedCircle);
        minimizedChats.push(minimizedCircle);
        adjustMinimizedChatPositions(); // Adjust positions of minimized circles

        // Handle click on the minimized circle to restore chat
        minimizedCircle.on('click', function (event) {
            if (!$(event.target).hasClass('minimized-chat-btn')) {
                chatContent.show();
                msgInputArea.show();
                chatWindow.addClass('active');
                minimizedCircle.remove();
                minimizedChats = minimizedChats.filter(chat => chat !== minimizedCircle);
                activeChats.push(username); // Add back to active chats
                updateChatPositions(); // Recalculate positions of all active chats
                adjustMinimizedChatPositions(); // Adjust positions after restoring
            }
        });

        // Handle click on the minimized-chat-btn to close the minimized circle
        minimizedCircle.find('.minimized-chat-btn').on('click', function (event) {
            event.stopPropagation();
            minimizedCircle.remove(); // Remove this minimized circle
            minimizedChats = minimizedChats.filter(chat => chat !== minimizedCircle);
            adjustMinimizedChatPositions(); // Adjust positions after closing
        });
    }
}

// Messaging functionality for each active chat
function appendMessage(name, side, text, chatElement) {
    let msg_img_text = `${side.charAt(0)}`;
    let msg_img_text_upper = msg_img_text.toUpperCase();
    const msgHTML = `
        <div class="msg ${side}-msg">
            <div class="msg-img">${msg_img_text_upper}</div>
               <div class="${side}-msg-boby">
                <div class="msg-bubble"> 
                    <div class="msg-text">${text}</div>
                    </div>
                    <div class="${side}-msg-time">${formatDate(new Date())}</div>   
                </div>
        </div>
    `;

    chatElement.append(msgHTML);
    setTimeout(() => {
        chatElement.scrollTop(chatElement[0].scrollHeight);
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
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Function to handle minimize, restore, and close actions for each chat window
function handleChatWindowActions() {
    $('.content-chat-message-user').each(function () {
        const chatWindow = $(this);
        const username = chatWindow.attr('data-username');
        const minimizeBtn = chatWindow.find('.fa-minus');
        const closeBtn = chatWindow.find('.fa-times');
        let minimizedCircle;

        // Minimize chat
        minimizeBtn.on('click', function () {
            minimizeChat(username);
        });

        // Close chat (hide instead of removing)
        closeBtn.on('click', function () {
            chatWindow.removeClass('active');
            const index = activeChats.indexOf(username);
            if (index !== -1) activeChats.splice(index, 1);
            updateChatPositions(); // Recalculate positions after closing
        });
    });
}

// Function to adjust minimized chat circles' positions dynamically
function adjustMinimizedChatPositions() {
    const availableHeight = $(window).height(); // Get the available window height
    const circleHeight = 50; // Height of each minimized circle (adjust if needed)
    const gap = 10; // Gap between each minimized circle
    const maxVisibleCircles = Math.floor((availableHeight - 40) / (circleHeight + gap)); // Maximum number of circles that can fit on the screen

    minimizedChats.forEach((chat, index) => {
        // If the number of minimized chats exceeds the visible space, limit their positions
        if (index < maxVisibleCircles) {
            const bottomPosition = 20 + (index * (circleHeight + gap)); // Adjust bottom dynamically
            chat.css('bottom', `${bottomPosition}px`);
            chat.css('right', '20px'); // Fix the right position
        } else {
            // Hide extra minimized circles that don't fit on the screen
            chat.hide();
        }
    });
}

// Adjust positions when window is resized to account for dynamic screen height
$(window).on('resize', function () {
    adjustMinimizedChatPositions();
});


// Initialize chat window actions when the page loads
$(document).ready(function () {
    handleChatWindowActions();
});

