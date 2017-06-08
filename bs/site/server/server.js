var express = require('express');
var app = express();
var fs=require('fs');
var file="./news.json";
var newsdata=JSON.parse(fs.readFileSync(file));


app.get('/api/getlist', function (req, res) {
   console.log("主页ajax请求");
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(newsdata));
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