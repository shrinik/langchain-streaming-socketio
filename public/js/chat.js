const socket = io()

document.querySelector("#message-form").addEventListener('submit', (e) => {
    e.preventDefault()

    const query = e.target.elements.message.value
    socket.emit('query', query)
})

socket.on('response', (message) => {
    console.log(message)
})
