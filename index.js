const http2 = require('http2');
const fs = require('fs');

const {getAllTasks} = require('./handlers/getHandlers');
const {Connection} = require('./config/connectDB');
const {TaskSchema} = require('./models/tasks')

const server = http2.createSecureServer({
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt')
});

const Conectar = new Connection('todolist', TaskSchema);
Conectar.Connect()
    .then((ItemModel) => {
        server.on('stream', (stream, headers) => {
            if(headers[":method"] === 'GET' && headers[":path"] === '/api/tasks') getAllTasks(ItemModel,stream);
            else if(headers[":method"] === 'GET' && headers[":path"] === '/api/task/1');
        });
    })

    .catch((err) => console.log(err));

server.on('error', (err) => console.error(err));

server.listen(8443, () => {
    console.log('Server listening on port 8443')
});