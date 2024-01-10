//Socket lado del cliente.
console.log("Probando cliente.")
const socketClient = io()

const form = document.getElementById("form")
const inputName = document.getElementById("name")
const inputPrice = document.getElementById("price")

form.onsubmit = (e) => {
    //para que no se refresque la página inicialmente
    e.preventDefault()
    //const userName = inputName.value
    const price = inputPrice.value
    //socketClient.emit('firstEvent',userName)
    socketClient.emit('firstEvent',price)
}

socketClient.on('segundoMensaje', (info)=>{
    //console.log(`Informacion enviada por el servidor ${info}.`)
    console.log(`Nuevo precio ${info}.`)
})


