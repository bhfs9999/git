var React = require('react');
var ReactDOM = require('react-dom');
var AppHeader = require('./Header.jsx');
var AppSponser = require('./Sponser.jsx');
var AppContent = require('./Content.jsx');
var AppFooter = require('./Footer.jsx');

var App = React.createClass({
    render: function(){
        return (
            <div>
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