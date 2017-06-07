import React from 'react'
import { render } from 'react-dom'
import App from './components/App.jsx'
import List from './components/List.jsx'
import Detail from './components/Detail.jsx'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

/*
var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();*/

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={List} />
            <Route path="/detail" component={Detail} />
        </Route>
    </Router>
), document.getElementById('content'))