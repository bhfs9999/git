import {Router, Route, Link} from 'react-router'
var React = require('react');
var Goback = require('./Contents/Goback.jsx');
var NewsDetail = require('./Contents/NewsDetail.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');

var Detail = React.createClass({
    getInitialState: function() {
        return {
            newsData: null
        }
    },
    componentDidMount() {
        var url = '/api/getdetail?newsid=' + this.props.params.newsid + "&" + new Date();
        scrollTo(0, 220);
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
                console.log(JSON.parse(data).news);
                this.setState({
                    newsData: JSON.parse(data)
                });
            })
            .catch((err) => {
                console.log("服务器错误");
                console.log(err);
            });
    },    
    render: function(){
        return (
        <div className="container outer-container">
            <div className="row">
                <div className="col-md-1">
                    <Goback />
                </div>
                <div className="col-md-8">
                    <NewsDetail newsdata={this.state.newsData ? this.state.newsData.news[0] : null} />
                </div>
                <div className="col-md-3">
                    <Navigator />
                    <br />
                    <br />
                    <Search />
                </div>
            </div>
        </div>
        );
    }
});

module.exports = Detail;