import {Router, Route, Link} from 'react-router'
require('es6-promise').polyfill();
require('isomorphic-fetch');
var React = require('react');
var NewsList = require('./Contents/NewsList.jsx');
var Paging = require('./Contents/Paging.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');

var List = React.createClass({
    getDefaultProps: function() {
        return {
            catemap: {"inland": "国内", "global": "国际", "sport": "体育", "finance": "经济", "game": "游戏"}
        }
    },
    getInitialState: function() {
        return {
            newsData: null,
            cate: this.props.params.cate || "inland"
        }
    },
    fetchNews: function() {
        var url = '/api/getlist?cate=' + this.props.catemap[this.state.cate] + '&' + new Date()
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
                console.log(err);
            });
    },
    componentDidMount() {
        this.fetchNews();
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            cate: nextProps.params.cate,
        }, function() {
            this.fetchNews();
           }
        );

    },
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-8">
                    <NewsList newsdata={this.state.newsData} />
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

module.exports = List;