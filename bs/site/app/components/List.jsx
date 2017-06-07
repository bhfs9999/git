import {Router, Route, Link} from 'react-router'
require('es6-promise').polyfill();
require('isomorphic-fetch');
var React = require('react');
var NewsList = require('./Contents/NewsList.jsx');
var Paging = require('./Contents/Paging.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');
let DefaultnewsData = require('./news.json');

var List = React.createClass({
    getInitialState: function() {
        return {
            newsData: DefaultnewsData
        }
    },
    componentDidMount() {
        fetch('/newsdata.json')
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
    },
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-8">
                    <NewsList newsdata={this.state.newsData} />
                    <Paging />
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