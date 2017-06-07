import {Router, Route, Link} from 'react-router'
var React = require('react');
var News = require('./Contents/News.jsx');
var Paging = require('./Contents/Paging.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');
let newsData = require('./news.json');

var List = React.createClass({
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-8">
                    <News />
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