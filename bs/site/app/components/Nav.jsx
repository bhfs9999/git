var React = require('react');
var AppAccount = require('./Account.jsx');

var Nav = React.createClass({

    showLoginForm: function() {
        $('#loginModal .registerBox').fadeOut('fast',function(){
            $('.loginBox').fadeIn('fast');
            $('.register-footer').fadeOut('fast',function(){
                $('.login-footer').fadeIn('fast');    
            });
            
            $('.modal-title').html('用户登录');
        });       
        $('.error').removeClass('alert alert-danger').html(''); 
    },
    openLoginModal: function() {
        this.showLoginForm();
        setTimeout(function(){
            $('#loginModal').modal('show');    
        }, 230);
    },
    showRegisterForm: function() {
        $('.loginBox').fadeOut('fast',function(){
            $('.registerBox').fadeIn('fast');
            $('.login-footer').fadeOut('fast',function(){
                $('.register-footer').fadeIn('fast');
            });
            $('.modal-title').html('账户注册');
        }); 
        $('.error').removeClass('alert alert-danger').html('');
    },
    openRegisterModal: function() {
        this.showRegisterForm();
        setTimeout(function(){
            $('#loginModal').modal('show');    
        }, 230);
    },

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
            <div>
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
                                <li style={loginStyle}>
                                    <button className="btn btn-default navbar-btn my-btn" data-toggle="modal" onClick={this.openLoginModal}>登录</button>
                                </li>
                                <li style={signInStyle}>
                                    <button className="btn btn-default navbar-btn my-btn" data-toggle="modal" onClick={this.openRegisterModal}>注册</button>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                    
                </nav>
                <AppAccount showLoginForm={this.showLoginForm} showRegisterForm={this.showRegisterForm}/>
            </div>
        );
    }
});

module.exports = Nav;