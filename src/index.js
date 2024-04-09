const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const ollama = require("@langchain/community/chat_models/ollama")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.on('query', (query) => {
        console.log("Query received")
        const chunks = [];
        const ollamaLlm = new ollama.ChatOllama({
            baseUrl: "http://localhost:11434", // Default value
            model: "mistral",
            streaming: true,
            callbacks: [
                {
                  handleLLMNewToken(token) {
                    socket.emit("response", token)
                  },
                },
              ],
        });
        ollamaLlm.invoke(query)
    })

    socket.on('disconnect', () => {
        io.emit('sendMessage', 'A user has left!')
    })

})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})