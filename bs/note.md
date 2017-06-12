1. 点击新闻下边的类别，跳转到对应类别新闻
2. 分页改为动态加载
3. 搜索栏
4. 右侧分类栏点击
5. > 父节点props改为state 

6. 使用json文件存储新闻数据
7. 遇到react无法解析html内容的问题，使用dangerouslySetInnerHTML解决，http://doc.okbase.net/xianyulaodi/archive/195329.html
8. JavaScript Array map() 方法: array.map(function(currentValue,index,arr), thisValue), 使用时会出现函数内部调用不了外部函数的情况，此时传入this即可:
    ```
    newsData.news.map(function (anews) {
        return <News 
                heading={anews.heading}
                updateProp={this.handleClick}
                img={anews.img}
                date={anews.date}
                cate={anews.cate}
                author={anews.author}
                txt= {anews.txt}
                />
        }, this)
    ```
9. ajax 使用fech实现，后端使用js搭建服务器，从数据库获取数据，返回json对象，此时会出现跨区请求问题，可以在fetch的请求头中加入mode:cors实现，但没有成功；后使用webpacl-dev-server的proxy代理实现，配置项如下：
    ```
    devServer: {
        contentBase: "./app/build",
        historyApiFallback: true,
        hot: true,
        inline: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:4001',
                secure: false,
                changeOrigin: true,
            }
        }
    },
    ```
    http://www.jianshu.com/p/3bdff821f859
    fetch请求这么写：
    ```
    var url = '/api/getlist?' + new Date()
    fetch(url,{
            method: 'GET', 
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                newsData: data
            });
            console.log(this.state.newsData);
        })
        .catch((err) => {
            console.log(err);
        });
    ```
    此时对/api/getlist的请求会被proxy自动加上域名，新的请求url为:http://localhost:4001/api/getlist,即后端js的监听端口，此时只要在js中编写对应代码相应请求，返回数据即可。
    要返回json格式数据，代码应该这么写：
    ```
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(newsdata));
   ```

10. 在一个自定义函数中调用异步函数，为了获取其返回值，需要传入一个回调函数作为参数
    ```
    function fetchDataFromDb(callback) {

        var sql = "select * from news where cate='游戏'"
        
        var response;
        connection.query(sql, function (err, result) {
            callback(null, JSON.stringify(response));
        });
    }
    ```
    在调用该函数时，传入一个自定义回调函数
    ```
    fetchDataFromDb(function(err, result){
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
    ```

11. 获取html标签中的内容
    ```
    var dd=anews.detail[0].replace(/<\/?.+?>/g,"");
    var dds=dd.replace(/ /g,"");//dds为得到后的内容
    ```

12. 提高加载速度 http://javascript.ruanyifeng.com/bom/ajax.html#toc27
13. 点击新闻标题后，页面返回顶部，使用scrollTo(0, 0)函数
14. 实现滚动回到顶部效果:
    ```
    $('html,body').animate({scrollTop: '0px'}, 500);
    ```
15. 控制组件的覆盖关系，使用z-index属性，99999最大，越大越靠前
16. 使用正则表达式对注册输入数据进行验证，例，邮件：
    ```
    var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

        if(reg.test(event.target.value) || event.target.value=="") {
    ```
17. express处理POST请求，需要使用body-parser插件，并在使用时引入。
    ```
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.post('/api/create_account', urlencodedParser, function (req, res) {
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.passwod;

        console.log("---------------主页Fetch请求: create_account ");
        console.log(email, username, passwod);
    })
    ```
18. sql查询时，若结果为空，result为一个空数组，需要使用result.length==0判断
19. 数据采用sha-1加密，加密在客户端完成，传递的信息为密文