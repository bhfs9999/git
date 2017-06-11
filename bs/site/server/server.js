var express = require('express');
var app = express();
var fs=require('fs');
var file="./news.json";
var newsdata=JSON.parse(fs.readFileSync(file));
var mysql      = require('mysql');
var bodyParser = require('body-parser');
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    port     : '3306',
    database : 'news_site'
});
connection.connect();

function operateDb(callback, sql) {
    var response;
    connection.query(sql, function (err, result) {
        if(err) {
            console.log('[SELECT ERROR] - ', err.message);
            callback(err, result);
        }
        else{
            callback(null, result);
        }
    });
}

function fetchNews(callback, sql) {
    operateDb(function(err, result) {
        if(err) throw err;

        var newslist = new Array();
        for(var i=0; i<result.length; i++) {
            var dd = result[i].description.replace(/<\/?.+?>/g,"");
            var overview = dd.replace(/ /g,"").substring(0,100) + "......"; //截取部分文字作为概览
            var year = result[i].date.getFullYear();
            var month = result[i].date.getMonth()+1;
            var date = result[i].date.getDate();
            var date = year + "-" + month + "-" + date
            anews = {"newsid": result[i].idnews, 
                     "heading": result[i].title,
                     "link": result[i].link,
                     "date": date,
                     "author": result[i].author,
                     "txt": [overview],
                     "detail": [result[i].description],
                     "origin": result[i].origin,
                     "cate": result[i].cate};
            newslist[i] = anews;
        }
        response = {"news": newslist};
        console.log("Fetched " + result.length + " news");
        callback(null, JSON.stringify(response));
    }, sql)
}

function fetchCount(callback, sql) {
    operateDb(function(err, result) {
        if(err) throw err;

        var countlist = new Object();
        for(var i=0; i<result.length; i++) {
            countlist[result[i].cate] = result[i].counts;
        }
        console.log(countlist);
        callback(null, JSON.stringify(countlist));
    }, sql)
}

app.get('/api/getlist', function (req, res) {
    console.log("\n---------------主页Fetch请求: getlist " + cate);

    var cate = req.query.cate;
    var sql = "select * from news where cate='" + cate + "'";

    res.writeHead(200, {'Content-Type': 'application/json'});

    fetchNews(function(err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    }, sql);
})

app.get('/api/getdetail', function (req, res) {
    console.log("\n---------------主页Fetch请求: getdetail " + newsid);
    
    var newsid = req.query.newsid;
    var sql = "select * from news where idnews='" + newsid + "'";

    res.writeHead(200, {'Content-Type': 'application/json'});

    fetchNews(function(err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    }, sql);
})

app.get('/api/getcount', function (req, res) {
    console.log("\n---------------主页Fetch请求: getcount ");
    
    var sql = "SELECT cate, count(*) as counts FROM news_site.news group by cate;";    

    res.writeHead(200, {'Content-Type': 'application/json'});

    fetchCount(function(err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    }, sql);
})

app.post('/api/create_account', urlencodedParser, function (req, res) {
    console.log("\n---------------主页Fetch请求: create_account ");

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var sql = "insert into news_site.account (user_name, email, password) values('" + username + "','" +  email + "','" + password + "');"
    
    operateDb(function (err, result) {
        if(err) {
            console.log('insert failed');
            res.end("failed");
        }
        else{
            console.log('insert success');
            res.end("success");
        }
    }, sql);

    
})

app.post('/api/check_email', urlencodedParser, function (req, res) {
    console.log("\n---------------主页Fetch请求: check_email ");

    var email = req.body.email;
    var sql = "SELECT * FROM news_site.account where email = '" + email +"';"
    
    operateDb(function (err, result) {
        if(err) {
            console.log('query failed');
        }
        else if(result.length==0){
            console.log('email can use');
            res.end("ok");
        }
        else{
            console.log('email cannot use');
            res.end("no");
        }
    }, sql);
    
})

app.post('/api/check_username', urlencodedParser, function (req, res) {
    console.log("\n---------------主页Fetch请求: check_username ");

    var username = req.body.username;
    var sql = "SELECT * FROM news_site.account where user_name = '" + username +"';"
    
    operateDb(function (err, result) {
        if(err) {
            console.log('query failed');
        }
        else if(result.length==0){
            console.log('username can use');
            res.end("ok");
        }
        else{
            console.log('username cannot use');
            res.end("no");
        }
    }, sql);

})

var server = app.listen(4001, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server running at http://%s:%s", host, port)
})