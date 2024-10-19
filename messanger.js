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
            let msgerChat = chatMessage.querySelector('.msger-chat');
            let msgerInputArea = chatMessage.querySelector('.msger-inputarea');
            const messageUsername = chatMessage.getAttribute('data-username');

            if (messageUsername === selectedUsername) {
                // Remove any minimized circle if the chat is reopened
                const minimizedCircle = document.querySelector(`.minimized-chat[data-username="${selectedUsername}"]`);
                if (minimizedCircle) minimizedCircle.remove();

                chatMessage.classList.add('active');
                msgerChat.style.display = 'block';
                msgerInputArea.style.display = 'block';
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

// Function to handle minimize, restore, and close actions for each chat window
function handleChatWindowActions() {
    const chatWindows = document.querySelectorAll('.content-chat-message-user');

    chatWindows.forEach(chatWindow => {
        const username = chatWindow.getAttribute('data-username');
        const minimizeBtn = chatWindow.querySelector('.fa-minus');
        const closeBtn = chatWindow.querySelector('.fa-times');
        let minimizedCircle;

        // Minimize chat
        minimizeBtn.addEventListener('click', () => {
            const chatContent = chatWindow.querySelector('.msger-chat');
            const msgInputArea = chatWindow.querySelector('.msger-inputarea');

            // Hide chat content and input area
            chatContent.style.display = 'none';
            msgInputArea.style.display = 'none';

            // Remove active class when minimized
            chatWindow.classList.remove('active');

            // Check if a minimized circle already exists, and remove it before creating a new one
            const existingMinimizedCircle = document.querySelector(`.minimized-chat[data-username="${username}"]`);
            if (existingMinimizedCircle) {
                existingMinimizedCircle.remove();
            }

            // Create minimized circle with the user's initial
            minimizedCircle = document.createElement('div');
            minimizedCircle.classList.add('minimized-chat');
            minimizedCircle.setAttribute('data-username', username); // Set username attribute for identification
            minimizedCircle.innerHTML = `
                <span></span>
                <span class="minimized-chat-shortname">${username.charAt(0)}</span>
                <span class="minimized-chat-tooltip">${username}</span>
                <span class="minimized-chat-btn">&times;</span>
            `;
            chatWindow.insertAdjacentElement('beforebegin', minimizedCircle);

            // Handle click on the minimized circle to restore chat
            minimizedCircle.addEventListener('click', (event) => {
                if (!event.target.classList.contains('minimized-chat-btn')) {
                    // Restore chat if not clicking the '×' button
                    const chatContent = chatWindow.querySelector('.msger-chat');
                    const msgInputArea = chatWindow.querySelector('.msger-inputarea');
                    chatContent.style.display = 'block';
                    msgInputArea.style.display = 'block';
                    chatWindow.classList.add('active');
                    minimizedCircle.remove(); // Remove the minimized circle after restoring
                }
            });

            // Handle click on the minimized-chat-btn to close the minimized circle
            minimizedCircle.querySelector('.minimized-chat-btn').addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering the restore functionality
                minimizedCircle.remove(); // Remove only this minimized circle
            });
        });

        // Close chat (hide instead of removing)
        closeBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active'); // Remove active class on close
            if (minimizedCircle) {
                minimizedCircle.remove(); // Remove the minimized circle if it exists
            }
        });
    });
}

// Initialize chat window actions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    handleChatWindowActions();
});
