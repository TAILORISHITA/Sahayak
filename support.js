// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// FAQ toggle
document.querySelectorAll('.faq-item strong').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('active');
  });
});

// Chat
const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const messages = document.getElementById('messages');

if (sendBtn && chatInput && messages) {
  sendBtn.addEventListener('click', () => {
    if (chatInput.value.trim() !== "") {
      let msg = document.createElement('div');
      msg.className = "msg user";
      msg.textContent = chatInput.value;
      messages.appendChild(msg);
      chatInput.value = "";
      messages.scrollTop = messages.scrollHeight;
    }
  });
}
