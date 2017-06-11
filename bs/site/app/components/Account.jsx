var React = require('react');

var Account = React.createClass({
    getInitialState: function() {
        return {
            loginUsername: "",
            loginPassword: "",
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: "",
            signUpConfirmPassword: ""
        }
    },
    loginSubmit: function () {
    },

    signUpSubmit: function () {
        if(this.state.signUpEmail=="" || this.state.signUpUsername=="" ||this.state.signUpPassword=="" ||this.state.signUpConfirmPassword=="") {
            $('.sign_error').html("请填写正确信息");
            $('.sign_error').addClass('alert alert-danger');
            this.shakeModal();
        }
        else {
            $('.sign_error').html("");
            $('.sign_error').removeClass('alert alert-danger');

            var postdata = "email=" + this.state.signUpEmail + "&username=" + this.state.signUpUsername + "&password=" + this.state.signUpPassword;
            var url = 'api/create_account';
            fetch(url, {
                method: 'POST',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': "application/x-www-form-urlencoded"
                }),
                body: postdata
            })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                if(data=="success") {
                    alert("创建成功")
                }
                else {
                    alert("创建失败")
                }
            })
            .catch((err) => {
                console.log(err);
            });

        }
    },

    shakeModal: function () {
        $('#loginModal .modal-dialog').addClass('shake');
        $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
        $('input[type="password"]').val('');
        setTimeout(function () {
            $('#loginModal .modal-dialog').removeClass('shake');
        }, 1000);
    },

    verifyEmail: function (event) {
        var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

        if(reg.test(event.target.value) || event.target.value=="") {
            $('.sign_email_error').html("");
            $('.sign_email_error').removeClass('alert alert-danger');

            if(reg.test(event.target.value)) {
                var postdata = "email=" + event.target.value;
                var url = 'api/check_email';
                fetch(url, {
                    method: 'POST',
                    redirect: 'follow',
                    headers: new Headers({
                        'Content-Type': "application/x-www-form-urlencoded"
                    }),
                    body: postdata
                })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    if(data=="ok") {
                        $('.sign_email_error').html("");
                        $('.sign_email_error').removeClass('alert alert-danger');
                    }
                    else {
                        $('.sign_email_error').html("该邮箱已被注册");
                        $('.sign_email_error').addClass('alert alert-danger');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

                this.setState({
                    signUpEmail: event.target.value
                })
            }
        }

        else {
            $('.sign_email_error').addClass('alert alert-danger').html("邮箱格式不正确");
            this.setState({
                signUpEmail: ""
            })
        }

    },
 
    verifyUsername: function (event) {
        var reg =  /^(?=.*\d)[a-z\d]{4,15}$/i;

        if(reg.test(event.target.value) || event.target.value=="") {
            $('.sign_username_error').html("");
            $('.sign_username_error').removeClass('alert alert-danger');

            if(reg.test(event.target.value)) {
                var postdata = "username=" + event.target.value;
                var url = 'api/check_username';
                fetch(url, {
                    method: 'POST',
                    redirect: 'follow',
                    headers: new Headers({
                        'Content-Type': "application/x-www-form-urlencoded"
                    }),
                    body: postdata
                })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    if(data=="ok") {
                        $('.sign_username_error').html("");
                        $('.sign_username_error').removeClass('alert alert-danger');
                    }
                    else {
                        $('.sign_username_error').html("该用户名已被注册");
                        $('.sign_username_error').addClass('alert alert-danger');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

                this.setState({
                    signUpUsername: event.target.value
                })
            }
        }

        else {
            $('.sign_username_error').addClass('alert alert-danger').html("用户名只能包含字母与数字，4-15字符");
            this.setState({
                signUpUsername: ""
            })
        }
    },

    verifyPassword: function (event) {
        var reg =  /^(?=.*\d)[a-z\d]{4,20}$/i;

        if(reg.test(event.target.value) || event.target.value=="") {
            $('.sign_password_error').html("");
            $('.sign_password_error').removeClass('alert alert-danger');
            this.setState({
                signUpPassword: event.target.value
            })
        }

        else {
            $('.sign_password_error').addClass('alert alert-danger').html("密码只能包含字母与数字，4-20字符");
            this.setState({
                signUpPassword: ""
            })
        }
    },

    verifyConfirmPassword: function (event) {

        if(event.target.value == this.state.signUpPassword || event.target.value=="") {
            $('.sign_password_confirm_error').html("");
            $('.sign_password_confirm_error').removeClass('alert alert-danger');
            this.setState({
                signUpConfirmPassword: event.target.value
            })
        }

        else {
            $('.sign_password_confirm_error').addClass('alert alert-danger').html("两次密码不一致");
            this.setState({
                signUpConfirmPassword: ""
            })
        }
    },

    componentDidMount: function() {
        $('#loginModal').on('hide.bs.modal', function() {
            $("#sign_email").val("");
            $("#sign_username").val("");
            $("#sign_password").val("");
            $("#sign_password_confirm").val("");
            $("#login_email").val("");
            $("#login_password").val("");
            $('.sign_email_error').html("");
            $('.sign_email_error').removeClass('alert alert-danger');
            $('.sign_username_error').html("");
            $('.sign_username_error').removeClass('alert alert-danger');
            $('.sign_password_error').html("");
            $('.sign_password_error').removeClass('alert alert-danger');
            $('.sign_password_confirm_error').html("");
            $('.sign_password_confirm_error').removeClass('alert alert-danger');
        });
    },

    render: function () {
        var displayStyle = {
            display: "none",
        };
        return (

            <div className="container">

                <div className="modal fade login" id="loginModal">
                    <div className="modal-dialog login animated">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">用户登录</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box">
                                    <div className="content">
                                        {/*<div className="social">
                                            <a className="circle github" href="/auth/github">
                                                <i className="fa fa-github fa-fw"></i>
                                            </a>
                                            <a id="google_login" className="circle google" href="/auth/google_oauth2">
                                                <i className="fa fa-google-plus fa-fw"></i>
                                            </a>
                                            <a id="facebook_login" className="circle facebook" href="/auth/facebook">
                                                <i className="fa fa-facebook fa-fw"></i>
                                            </a>
                                        </div>*/}

                                        <div className="division">
                                            <div className="line l"></div>
                                            <span>or</span>
                                            <div className="line r"></div>
                                        </div>

                                        
                                        <div className="login_error"></div>
                                        <div className="sign_error"></div>

                                        <div className="form loginBox">
                                            <form method="post" action="/login" accept-charset="UTF-8">
                                                <input id="login_email" className="form-control" type="text" placeholder="Email" name="email" />
                                                <input id="login_password" className="form-control" type="password" placeholder="Password" name="password" />
                                                <input className="btn btn-default btn-login" type="button" value="登录" onClick={this.loginSubmit} />
                                            </form>
                                        </div>

                                        <div className="content registerBox" style={displayStyle}>
                                            <div className="form">
                                                <form html="{:multipart=>true}" data-remote="true" accept-charset="UTF-8">
                                                    <input id="sign_email" className="form-control" type="text" placeholder="邮箱" name="email" onBlur={this.verifyEmail} />
                                                    <div className="sign_email_error"></div>
                                                    <input id="sign_username" className="form-control" type="text" placeholder="用户名（字母、数字组成，4-15字符）" name="user_name" onBlur={this.verifyUsername} />
                                                    <div className="sign_username_error"></div>
                                                    <input id="sign_password" className="form-control" type="password" placeholder="密码（字母、数字组成，4-20字符）" name="password" onBlur={this.verifyPassword} />
                                                    <div className="sign_password_error"></div>
                                                    <input id="sign_password_confirm" className="form-control" type="password" placeholder="确认密码" name="password_confirmation" onBlur={this.verifyConfirmPassword} />
                                                    <div className="sign_password_confirm_error"></div>
                                                    <input className="btn btn-default btn-register" type="button" value="创建账号" onClick={this.signUpSubmit} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">

                                <div className="forgot login-footer">
                                    <span>还没有账号？
                                        <a a href="javascript:void(0)" onClick={this.props.showRegisterForm}>&nbsp;&nbsp;注册</a>
                                    </span>
                                </div>

                                <div className="forgot register-footer" style={displayStyle}>
                                    <span>已有账号？</span>
                                    <a href="javascript:void(0)" onClick={this.props.showLoginForm}>&nbsp;&nbsp;登录</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Account;