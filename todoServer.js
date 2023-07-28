const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())


app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});


app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/todoViews/index.html');
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + '/todoViews/style.css');
});


app.get('/todoScripts.js', function(req, res) {
    res.sendFile(__dirname + '/todoViews/scripts/todoScripts.js');
});

app.post('/add', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        if (data == '') data = '[]';

        let dataObj = JSON.parse(data); 
        dataObj.push(req.body);
        fs.writeFile('data.json', JSON.stringify(dataObj), (err) => {
            if (err) throw err;
            res.send(dataObj);
        });
    });
});

app.get('/todoData', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});


app.post('/delete', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let dataObj = JSON.parse(data);
        dataObj.forEach((item, index) => {
            if (item.id == req.body.id) {
                dataObj.splice(index, 1);
            }
        });
        fs.writeFile('data.json', JSON.stringify(dataObj), (err) => {
            if (err) throw err;
            res.send(dataObj);
        });
    });
});

app.post('/update', (req, res) => { 
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let dataObj = JSON.parse(data);
        dataObj.forEach((item) => {
            if (item.id == req.body.id) {
                item.checked = req.body.checked;
            }
        });
        fs.writeFile('data.json', JSON.stringify(dataObj), (err) => {
            if (err) throw err;
            res.send(dataObj);
        });
    });
});



