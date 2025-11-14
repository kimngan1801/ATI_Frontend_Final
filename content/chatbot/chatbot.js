// Scoped Chatbot JS for the chatbot wrapper panel
(function () {
  const root = document.querySelector('.chatbot-wrapper');
  if (!root) return;

  const typingForm = root.querySelector('.typing-form');
  const chatContainer = root.querySelector('.chat-list');
  const suggestions = root.querySelectorAll('.suggestion');
  const toggleThemeButton = document.querySelector('#theme-toggle-button'); // outside control if exists
  const deleteChatButton = root.querySelector('#delete-chat-button');

  let userMessage = null;
  let isResponseGenerating = false;

  const API_KEY = "PASTE-YOUR-API-KEY"; // Your API key here
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const setWrapperThemeClass = (isLight) => {
    root.classList.toggle('light_mode', isLight);
  };

  const loadDataFromLocalstorage = () => {
    const saved = localStorage.getItem('chatbot-saved-chats');
    const theme = localStorage.getItem('chatbot-themeColor');
    const isLightMode = theme === 'light_mode';
    setWrapperThemeClass(isLightMode);
    if (toggleThemeButton) toggleThemeButton.innerText = isLightMode ? 'dark_mode' : 'light_mode';

    chatContainer.innerHTML = saved || '';
    root.classList.toggle('hide-header', !!saved);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  };

  const createMessageElement = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add('message', ...classes);
    div.innerHTML = content;
    return div;
  };

  const showTypingEffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(' ');
    let idx = 0;
    const typingInterval = setInterval(() => {
      textElement.innerText += (idx === 0 ? '' : ' ') + words[idx++];
      incomingMessageDiv.querySelector('.icon').classList.add('hide');
      if (idx === words.length) {
        clearInterval(typingInterval);
        isResponseGenerating = false;
        incomingMessageDiv.querySelector('.icon').classList.remove('hide');
        localStorage.setItem('chatbot-saved-chats', chatContainer.innerHTML);
      }
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }, 75);
  };

  const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector('.text');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Request failed');
      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
      showTypingEffect(apiResponse, textElement, incomingMessageDiv);
    } catch (error) {
      isResponseGenerating = false;
      textElement.innerText = error.message;
      textElement.parentElement.closest('.message').classList.add('error');
    } finally {
      // Ensure the loading state is visible for at least 700ms
      const started = Number(incomingMessageDiv.dataset.loadingStart || 0);
      const elapsed = Date.now() - started;
      const delay = Math.max(0, 700 - elapsed);
      setTimeout(() => {
        incomingMessageDiv.classList.remove('loading');
        delete incomingMessageDiv.dataset.loadingStart;
      }, delay);
    }
  };

  const showLoadingAnimation = () => {
    const html = `<div class="message-content">
                    <img class="avatar" src="/images/logo.svg" alt="Assistant avatar">
                  <p class="text"></p>
                  <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                  </div>
                </div>
                <span onClick="" class="icon material-symbols-rounded">content_copy</span>`;
    const incomingMessageDiv = createMessageElement(html, 'incoming', 'loading');
    // Record start time to keep loader visible for a minimum duration
    incomingMessageDiv.dataset.loadingStart = String(Date.now());
    chatContainer.appendChild(incomingMessageDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    generateAPIResponse(incomingMessageDiv);
  };

  const copyMessage = (copyButton) => {
    const messageText = copyButton.parentElement.querySelector('.text').innerText;
    navigator.clipboard.writeText(messageText);
    copyButton.innerText = 'done';
    setTimeout(() => (copyButton.innerText = 'content_copy'), 1000);
  };

  // Delegate click for copy buttons within the wrapper
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.icon');
    if (btn && btn.textContent.trim() === 'content_copy') {
      e.preventDefault();
      copyMessage(btn);
    }
  });

  const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector('.typing-input').value.trim() || userMessage;
    if (!userMessage || isResponseGenerating) return;
    isResponseGenerating = true;
    const html = `<div class="message-content">
                  <img class="avatar" src="/chatbot/images/AvatarUser.jpg" alt="User avatar">
                  <p class="text"></p>
                </div>`;
    const outgoingMessageDiv = createMessageElement(html, 'outgoing');
    outgoingMessageDiv.querySelector('.text').innerText = userMessage;
    chatContainer.appendChild(outgoingMessageDiv);

    typingForm.reset();
    root.classList.add('hide-header');
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showLoadingAnimation, 500);
  };

  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      const isLightMode = root.classList.toggle('light_mode');
      localStorage.setItem('chatbot-themeColor', isLightMode ? 'light_mode' : 'dark_mode');
      toggleThemeButton.innerText = isLightMode ? 'dark_mode' : 'light_mode';
    });
  }

  if (deleteChatButton) {
    deleteChatButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all the chats?')) {
        localStorage.removeItem('chatbot-saved-chats');
        loadDataFromLocalstorage();
      }
    });
  }

  suggestions.forEach((suggestion) => {
    suggestion.addEventListener('click', () => {
      userMessage = suggestion.querySelector('.text').innerText;
      handleOutgoingChat();
    });
  });

  typingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleOutgoingChat();
  });

  loadDataFromLocalstorage();
})();
