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
