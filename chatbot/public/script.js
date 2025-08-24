let ws = new WebSocket("ws://localhost:3000");

let usernameInput = document.getElementById("username");
let messageInput = document.getElementById("message");
let chatBox = document.getElementById("chat-box");
let usersList = document.getElementById("users-list");
let fileInput = document.getElementById("fileInput");

// Set username
usernameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") setUsername();
});

// Send message
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// File upload
fileInput.addEventListener("change", sendFile);

function setUsername() {
  let username = usernameInput.value.trim();
  if (username) {
    ws.send(JSON.stringify({ type: "newUser", username }));
    usernameInput.disabled = true;
  }
}

function sendMessage() {
  let message = messageInput.value.trim();
  if (message) {
    ws.send(JSON.stringify({ type: "chat", message }));
    messageInput.value = "";
  }
}

function sendFile() {
  let file = fileInput.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      ws.send(JSON.stringify({
        type: "file",
        fileName: file.name,
        fileUrl: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  }
}

// Receive messages
ws.onmessage = (event) => {
  let data = JSON.parse(event.data);
  let msg = document.createElement("p");

  if (data.type === "chat") {
    msg.classList.add("other");
    msg.innerHTML = `<b>${data.username}:</b> ${data.message} <span class="time">${data.time}</span>`;
    notify(`${data.username}`, data.message);
  }
  else if (data.type === "file") {
    msg.classList.add("other");
    msg.innerHTML = `<b>${data.username}:</b> <a href="${data.fileUrl}" target="_blank">${data.fileName}</a> <span class="time">${data.time}</span>`;
    notify(`${data.username}`, `📎 Sent a file: ${data.fileName}`);
  }
  else if (data.type === "notification") {
    msg.classList.add("notification");
    msg.innerHTML = data.message;
  }
  else if (data.type === "history") {
    data.messages.forEach((m) => {
      let historyMsg = document.createElement("p");
      historyMsg.classList.add(m.type === "chat" || m.type === "file" ? "other" : "notification");
      if (m.type === "chat") {
        historyMsg.innerHTML = `<b>${m.username}:</b> ${m.message} <span class="time">${m.time}</span>`;
      } else if (m.type === "file") {
        historyMsg.innerHTML = `<b>${m.username}:</b> <a href="${m.fileUrl}" target="_blank">${m.fileName}</a> <span class="time">${m.time}</span>`;
      } else {
        historyMsg.innerHTML = m.message;
      }
      chatBox.appendChild(historyMsg);
    });
  }
  else if (data.type === "users") {
    usersList.innerHTML = "";
    data.list.forEach(user => {
      let li = document.createElement("li");
      li.textContent = user;
      usersList.appendChild(li);
    });
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Notification
function notify(sender, content) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, ctx.currentTime);
  oscillator.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.2);

  if (Notification.permission === "granted") {
    new Notification(`💬 ${sender}`, {
      body: content.length > 50 ? content.substring(0, 50) + "..." : content,
      icon: "https://img.icons8.com/color/96/chat.png"
    });
  }
}

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
