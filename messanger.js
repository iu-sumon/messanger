const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
];

const BOT_NAME = "BOT";

// Toggle the chat popup when Messenger icon is clicked
$('#messenger-icon').on('click', function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
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

// Function to manage multiple chat windows
function handleMessagingForChat(username) {
    const chatWindow = $(`.content-chat-message-user[data-username="${username}"]`);
    const msgerForm = chatWindow.find('.msger-inputarea');
    const msgerInput = chatWindow.find('.msger-input');
    const msgerChat = chatWindow.find('.msger-chat');

    msgerForm.on("submit", function(event) {
        event.preventDefault();

        const msgText = msgerInput.val();
        if (!msgText) return;

        appendMessage(username, "right", msgText, msgerChat);
        msgerInput.val("");

        botResponse(msgerChat); // Simulate bot response per chat
    });
}

// Handle user chat selection
$('.user-chat').on('click', function () {
    const selectedUsername = $(this).attr('data-username');

    // Activate the corresponding chat window and allow messaging
    $('.content-chat-message-user').each(function () {
        const msgerChat = $(this).find('.msger-chat');
        const msgerInputArea = $(this).find('.msger-inputarea');
        const messageUsername = $(this).attr('data-username');

        if (messageUsername === selectedUsername) {
            // Remove any minimized circle if the chat is reopened
            const minimizedCircle = $(`.minimized-chat[data-username="${selectedUsername}"]`);
            if (minimizedCircle.length) minimizedCircle.remove();

            $(this).addClass('active');
            msgerChat.show();
            msgerInputArea.show();
            $('#chat-popup').removeClass('active');

            // Initialize messaging for the selected chat
            handleMessagingForChat(selectedUsername);
        }
    });
});

// Messaging functionality for each active chat
function appendMessage(name, side, text, chatElement) {
    let msg_img_text = `${side.charAt(0)}`;
    let msg_img_text_upper = (msg_img_text).toUpperCase();
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
            const chatContent = chatWindow.find('.msger-chat');
            const msgInputArea = chatWindow.find('.msger-inputarea');

            // Hide chat content and input area
            chatContent.hide();
            msgInputArea.hide();

            // Remove active class when minimized
            chatWindow.removeClass('active');

            // Check if a minimized circle already exists, and remove it before creating a new one
            const existingMinimizedCircle = $(`.minimized-chat[data-username="${username}"]`);
            if (existingMinimizedCircle.length) {
                existingMinimizedCircle.remove();
            }

            // Create minimized circle with the user's initial
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

            chatWindow.before(minimizedCircle);

            // Handle click on the minimized circle to restore chat
            minimizedCircle.on('click', function (event) {
                if (!$(event.target).hasClass('minimized-chat-btn')) {
                    // Restore chat if not clicking the '×' button
                    chatContent.show();
                    msgInputArea.show();
                    chatWindow.addClass('active');
                    minimizedCircle.remove(); // Remove the minimized circle after restoring
                }
            });

            // Handle click on the minimized-chat-btn to close the minimized circle
            minimizedCircle.find('.minimized-chat-btn').on('click', function (event) {
                event.stopPropagation(); // Prevent triggering the restore functionality
                minimizedCircle.remove(); // Remove only this minimized circle
            });
        });

        // Close chat (hide instead of removing)
        closeBtn.on('click', function () {
            chatWindow.removeClass('active'); // Remove active class on close
            if (minimizedCircle) {
                minimizedCircle.remove(); // Remove the minimized circle if it exists
            }
        });
    });
}

// Initialize chat window actions when the page loads
$(document).ready(function () {
    handleChatWindowActions();
});
