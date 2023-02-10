
var express = require('express');
var cors = require('cors');
var app = express();


var corsOptions = function(req, res, next){ 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
    'Content-Type, Authorization, Content-Length, X-Requested-With');
     next();
}

app.use(corsOptions);
app.use(express.json({}));
app.use(express.urlencoded({
        extended:true
}));

const routes = require('./routes/index')(app);

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'),
    function (err) {
        if (err) throw err;
        var message = 'Server is running @ http://localhost:' + server.address().port;
        console.log(message);
    }
);

