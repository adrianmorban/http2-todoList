//requires dependencies
const express = require('express');
const spdy = require('spdy');
const fs = require('fs');

//requires handlers
const {getAllTasks, getOneTask} = require('./handlers/getHandlers');
const {postHandler} = require('./handlers/postHandler');
const {putHandler} = require('./handlers/putHandler');
const {deleteHandler} = require('./handlers/deleteHandler');
const {patchHandler} = require('./handlers/patchHandler');
const {headHandler} = require('./handlers/headHandler')

//require configs
const {Connection} = require('./config/connectDB');
const {TaskSchema} = require('./models/tasks');
const {createFirstVersion, getVersionModel} = require('./models/version');

const app = express();
app.use(express.static('public'));

app.set('etag','weak');
//Connection options
const options = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
    spdy: {
        protocols: ['h2', 'spdy/3.1']
    }
}

getVersionModel().then(versionModel => {
    createFirstVersion(versionModel);
})

const server = spdy.createServer(options, app);

const Conectar = new Connection('todolist', TaskSchema);
Conectar.Connect()
    .then((taskModel) => {

        //GET && HEAD
        app.get('/api/tasks',(req, res) => {
            if(req.method === 'GET') getAllTasks(taskModel, res)
            if(req.method === 'HEAD') headHandler(res, req);
        });

        //GET ONE
        app.get('/api/task/:id',(req, res) => {
            let id = req.params.id;
            getOneTask(taskModel, res, id);
        })

        //POST
        app.post('/api/tasks', (req, res) => {
            req.on('data',(chunk)=>{
                let data = JSON.parse(chunk.toString());
                postHandler(taskModel, data, res);
            });
        })

        //PUT
        app.put('/api/task/:id', (req, res) => {
            req.on('data',(chunk)=>{
                let id = req.params.id;
                let data = JSON.parse(chunk.toString());
                putHandler(taskModel, data, res, id);
            });
        });

        //DELETE
        app.delete('/api/task/:id', (req, res) => {
            let id = req.params.id;
            deleteHandler(taskModel, res, id);
        });

        //PATCH
        app.patch('/api/task/:id', (req, res) => {
            req.on('data',(chunk)=>{
                let id = req.params.id;
                let data = JSON.parse(chunk.toString());
                patchHandler(taskModel, data, res, id);
            });
        });
    })
    .catch((err) => console.log(err));

server.on('error', (err) => console.error(err));

server.listen(8443, () => {
    console.log('Server listening on port 8443')
});