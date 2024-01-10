import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import {__dirname} from './utils.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

//handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

//Socket lado del servidor
app.use('/', viewsRouter)

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.`)
})

//Websocket - server
const socketServer = new Server(httpServer)

const messages = []
//connection - disconnect

//const names = []
//El socketServer escucha el evento que se genera en el cliente.
// socketServer.on('connection', (socket) => {
//     console.log(`Cliente conectado con el id: ${socket.id}.`)
//     socket.on('disconnect', () =>{
//         console.log(`Cliente desconectado con el id: ${socket.id}.`)
//     })

//         socket.on('firstEvent',(info)=>{
//             //names.push(info)
//             //socket.emit('segundoMensaje',names)
//             //socketServer.emit('segundoMensaje',names)
//             //socket.broadcast.emit('segundoMensaje',names)
//             socketServer.emit('segundoMensaje',info)
//         })
// })

socketServer.on('connection', (socket) => {
    socket.on("newUser", (user) => {
        socket.broadcast.emit('newUserBroadcast',user)
    })
    socket.on('message', info => {
        messages.push(info)
        socketServer.emit('chat',messages)
    })
}) 