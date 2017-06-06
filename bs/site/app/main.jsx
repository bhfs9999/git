import React from 'react'
import { render } from 'react-dom'
import App from './components/App.jsx'
import Header from './components/Header.jsx'
import AppContent from './components/Content.jsx'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

/*
var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();*/

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="lala" component={AppContent}/>
        </Route>
    </Router>
), document.getElementById('content'))