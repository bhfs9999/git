var React = require('react');
var ReactDOM = require('react-dom');
var AppHeader = require('./components/Header.jsx');
var AppSponser = require('./components/Sponser.jsx');
var AppContent = require('./components/Content.jsx');
var AppFooter = require('./components/Footer.jsx');

/*
var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();*/



ReactDOM.render(<AppHeader />, document.getElementById('header'));
ReactDOM.render(<AppSponser />, document.getElementById('sponser'));
ReactDOM.render(<AppContent />, document.getElementById('content'));
ReactDOM.render(<AppFooter />, document.getElementById('footer'));