var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    port     : '3306',
    database : 'news_site'
});

 
connection.connect();

var sql = "select * from news where cate='游戏'"
 
connection.query(sql, function (err, result) {
    if(err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }
    var newslist = new Array();
    for(var i=0; i<5; i++) {
        var dd = result[i].description.replace(/<\/?.+?>/g,"");
        var overview = dd.replace(/ /g,"").substring(0,200) + "......";//dds为得到后的内容
        var year = result[i].date.getFullYear();
        var month = result[i].date.getMonth()+1;
        var date = result[i].date.getDate();
        var date = year + "-" + month + "-" + date
        console.log(date);
        anews = {"newsid": result[i].idnews, 
                    "heading": result[i].title,
                    "link": result[i].link,
                    "date": result[i].date,
                    "author": result[i].author,
                    "txt": [overview],
                    "detail": [result[i].description],
                    "origin": result[i].origin,
                    "cate": result[i].cate};
        // console.log(anews);
        newslist[i] = anews;
    }
    
    response = {"news": newslist};

    // console.log(response)
    // console.log('--------------------------SELECT----------------------------');
    // console.log(JSON.stringify(response));
    // console.log('------------------------------------------------------------\n\n');  
});

connection.end();