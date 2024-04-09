const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const ollama = require("@langchain/community/chat_models/ollama")

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const ollamaLlm = new ollama.ChatOllama({
    baseUrl: "http://localhost:11434", // Default value
    model: "phi", // Default value
  });

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.on('query', (query) => {
        console.log("Query received")
        ollamaLlm.invoke(query).then(response => {
            console.log(response)
            socket.emit("response", response.content)
        })
    })

    socket.on('disconnect', () => {
        io.emit('sendMessage', 'A user has left!')
    })

})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})