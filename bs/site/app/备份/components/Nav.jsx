var React = require('react');

var Nav = React.createClass({
    render: function(){

        var loginStyle = {
            marginRight: 15,
        };

        var signInStyle = {
            marginRight: 40,
        };

        var brandStyle = {
            fontSize: 20,
        };
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">
                            <span className="glyphicon glyphicon-globe" aria-hidden="true" style={brandStyle} ></span>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul className="nav navbar-nav navbar-right">
                            <li style={loginStyle}><button type="submit" className="btn btn-default navbar-btn my-btn" onClick={this.props.handleLogin}>登录</button></li>
                            <li style={signInStyle}><button type="button" className="btn btn-default navbar-btn my-btn" onClick={this.props.handleSignIn}>注册</button></li>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Nav;