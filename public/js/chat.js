const socket = io()
const color = 

document.querySelector("#btnClear").addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('#chatbox').value = ""
})

document.querySelector("#query-form").addEventListener('submit', (e) => {
    e.preventDefault()
    const query = e.target.elements.query.value
    document.querySelector('#chatbox').value += "\n\n-----------------------------------------------------------------------\n\n"
    socket.emit('query', query)
})

socket.on('response', (message) => {
    document.querySelector('#chatbox').value += message
})
