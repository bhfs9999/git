var React = require('react');
var ReactDOM = require('react-dom');
var AppHeader = require('./Header.jsx');
var AppSponser = require('./Sponser.jsx');
var AppFooter = require('./Footer.jsx');
var AppNav = require('./Nav.jsx');
var AppLogin = require('./Login.jsx');

var App = React.createClass({
    getInitialState: function() {
        return {
            showLogin: false,
            showSignIn: false
        }
    },
    clickLogin: function() {
        this.setState({
            showLogin: true,
        });
    },
    clickSignIn() {
        this.setState({
            showSignIn: true,
        });
    },
    render: function(){
        return (
            <div>
                {this.state.showLogin ? <AppLogin /> : null}
                <section className="nav-section" id="nav"> <AppNav handleLogin={this.clickLogin} handleSignIn={this.clickSignIn} /> </section>
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