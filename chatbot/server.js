const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let users = new Map();        // Map of ws => username
let chatHistory = [];         // store chat history

wss.on("connection", (ws) => {
    console.log("New user connected.");

    // Send history & online users
    ws.send(JSON.stringify({ type: "history", messages: chatHistory }));
    ws.send(JSON.stringify({ type: "users", list: Array.from(users.values()) }));

    ws.on("message", (message) => {
        let data = JSON.parse(message);

        if (data.type === "newUser") {
            users.set(ws, data.username);
            broadcast({ type: "notification", message: `👋 <b>${data.username}</b> has joined the chat!` });
            broadcast({ type: "users", list: Array.from(users.values()) });
        } 
        else if (data.type === "chat") {
            let msgData = { 
                type: "chat", 
                username: users.get(ws), 
                message: data.message, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            };
            chatHistory.push(msgData);
            if (chatHistory.length > 50) chatHistory.shift();
            broadcast(msgData);
        }
        else if (data.type === "file") {
            let fileData = { 
                type: "file", 
                username: users.get(ws), 
                fileName: data.fileName, 
                fileUrl: data.fileUrl,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            chatHistory.push(fileData);
            if (chatHistory.length > 50) chatHistory.shift();
            broadcast(fileData);
        }
    });

    ws.on("close", () => {
        let username = users.get(ws);
        users.delete(ws);
        broadcast({ type: "notification", message: `❌ <b>${username}</b> has left the chat.` });
        broadcast({ type: "users", list: Array.from(users.values()) });
    });
});

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

server.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
