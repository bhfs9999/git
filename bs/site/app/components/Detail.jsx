import {Router, Route, Link} from 'react-router'
var React = require('react');
var Goback = require('./Contents/Goback.jsx');
var NewsDetail = require('./Contents/NewsDetail.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');
let newsData = require('./news.json');

var Detail = React.createClass({
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <Goback />
                </div>
                <div className="col-md-8">
                    <NewsDetail newsdata={newsData.news[this.props.params.id]} />
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