💬 Real-Time Chat Application
A modern, real-time chat application built with Node.js, WebSocket, HTML, CSS, and JavaScript.
This project enables users to connect, send, and receive messages instantly with a clean and aesthetic UI.

🚀 Features
🔹 Real-time messaging using WebSocket

🔹 Multiple users support with online/offline status

🔹 Chat history storage (stored in memory or database)

🔹 User-friendly interface with responsive design

🔹 Notifications for new messages

🔹 Advanced GUI with side panel & message bubbles

🔹 Optional features: message reactions, typing indicator, and sound notifications

🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript

Backend: Node.js, WebSocket

Styling: Modern CSS with Google Fonts

Optional Database: MongoDB / JSON (for persistent chat history)

📂 Project Structure
pgsql
Copy
Edit
📦 Real-Time-Chat-App
 ┣ 📂 public
 ┃ ┣ 📜 index.html
 ┃ ┣ 📜 style.css
 ┃ ┗ 📜 script.js
 ┣ 📂 server
 ┃ ┗ 📜 server.js
 ┣ 📂 utils
 ┃ ┗ 📜 notification.js
 ┣ 📜 package.json
 ┗ 📜 README.md
⚡ Installation & Setup
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/real-time-chat.git
cd real-time-chat
Install dependencies

bash
Copy
Edit
npm install
Start the server

bash
Copy
Edit
node server/server.js
Open in browser
Go to 👉 http://localhost:3000

🔔 Notifications System
The app supports notifications for new messages or events.

File: utils/notification.js

Purpose: To handle browser notifications when a user receives a new message while the app is in the background.

How to Use:

Ensure the browser has granted notification permission.

Import the notification module in your main JS file (script.js).

Call the function showNotification(title, message) whenever a new message is received.

Example:

javascript
Copy
Edit
import { showNotification } from './utils/notification.js';

showNotification('New Message', 'John: Hey, how are you?');
📸 Screenshots
Chat UI

🔮 Future Enhancements
✅ Add user authentication (login/register)

✅ Save messages in MongoDB

✅ Private chats & group chats

✅ Emoji & file sharing support

✅ Dark/Light mode toggle

🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request.

📜 License
This project is licensed under the MIT License.
