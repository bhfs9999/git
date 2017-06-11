var React = require('react');
var ReactDOM = require('react-dom');
var AppHeader = require('./Header.jsx');
var AppSponser = require('./Sponser.jsx');
var AppFooter = require('./Footer.jsx');
var AppNav = require('./Nav.jsx');

var App = React.createClass({
    render: function(){
        return (
            <div>
                <section className="nav-section" id="nav"> <AppNav /> </section>
                <section className="header-section" id="header"> <AppHeader /> </section>
                <section id="sponser"> <AppSponser /> </section>
                <hr />
                <section id="content"> {this.props.children} </section>
                <hr />
                <div id="footer"> <AppFooter /> </div>
            </div>
        );
    }
});

module.exports = App;