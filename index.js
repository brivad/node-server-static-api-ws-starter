const express = require('express')
const WebSocket = require('ws')

const app = express()
const router = express.Router()

router.get('/status', function(req, res) {
  res.json({ status: 'App is running!' })
})

app.use('/', router)
app.use(express.static('static'))

const port = process.env.PORT || 3002
const server = app.listen(port, () => {
  console.log('server started on port', port)
})

//if serving static app from another server/port, send CORS headers in response
//{ headers: {
//"Access-Control-Allow-Origin": "*",
//    "Access-Control-Allow-Headers": "http://localhost:3000",
//    "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
//} }

const wss = new WebSocket.Server({ server }) // uses server's host and port also for ws
// const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 }) // custom

//init Websocket ws and handle incoming connect requests
wss.on('connection', function connection(ws) {
  console.log('connection ...')

  //on connect message
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  ws.send('something')
})
