var express = require('express');
var app = express();
var fs=require('fs');
var file="./news.json";
var newsdata=JSON.parse(fs.readFileSync(file));
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    port     : '3306',
    database : 'news_site'
});
connection.connect();

function fetchDataFromDb(callback) {

    var sql = "select * from news where cate='游戏'"
    
    var response;
    connection.query(sql, function (err, result) {
        if(err) {
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        var newslist = new Array();
        for(var i=0; i<result.length; i++) {
            var dd = result[i].description.replace(/<\/?.+?>/g,"");
            var overview = dd.replace(/ /g,"").substring(0,100) + "......"; //截取部分文字作为概览
            anews = {"newsid": result[i].idnews, 
                     "heading": result[i].title,
                     "link": result[i].link,
                     "date": result[i].date,
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
    });
}

app.get('/api/getlist', function (req, res) {
   console.log("主页ajax请求");
   res.writeHead(200, {'Content-Type': 'application/json'});
   fetchDataFromDb(function(err, result){
       if (err) throw err;
       res.end(JSON.stringify(result));
   });
})

app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

app.post('/api', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/api/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
var server = app.listen(4001, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server running at http://%s:%s", host, port)
})