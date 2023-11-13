var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = "8af09710ed01df4fceb0";
const CLIENT_SECRET = "b0a0679070cd9872f7cc7ce521bc2a5f1297bd4c";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res){

    console.log(req.query.code);

    const parms = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" +req.query.code;

    await fetch("https://github.com/login/oauth/access_token" +parms, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then ((response) => {
        return response,bodyParser.json();
    }).then ((data) => {
        consolelog(data);
        res.json(data);
    });
});

app.get('/getuserData', async function(req, res){
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization" : req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
})

app.listen(4000, function() {
    console.log("CORS server running on port 4000");
});
