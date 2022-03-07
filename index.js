const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const port = 5090;

const url = 'mongodb+srv://kiosk_user:mPfFB6de1GkUzMEf@cluster0.cxcp4.mongodb.net/kiosk_db?retryWrites=true&w=majority';
mongoose.connect(url)
.then(results => {
    console.log(results);
    app.listen(port, function(){
        console.log(`Server is runing via port ${port}`);
    })
})
.catch(err => {
    console.log(err);
})