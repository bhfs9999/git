var React = require('react');

var Login = React.createClass({
    render: function(){
        var divStyle = {
            position: "fixed",
            textAlign: "center",
            zIndex: 10,
            left: 0,
            right: 0,
            top: 0,
            buttom: 0,
            margin: "auto"
        }
        return (
            <div className="container" style={divStyle}>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">

                        <form action="#" className="fh5co-form animate-box" data-animate-effect="fadeIn">
                            <h2>Login</h2>
                            <div className="form-group">
                                <label for="username" className="sr-only">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Username" autocomplete="off" />
                            </div>
                            <div className="form-group">
                                <label for="password" className="sr-only">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" autocomplete="off" />
                            </div>
                            <div className="form-group">
                                <label for="remember" ><input type="checkbox" id="remember" /> Remember Me</label>
                            </div>
                            <div className="form-group">
                                <p><a href="forgot.html">Forgot Password?</a></p>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Sign In" className="btn btn-primary" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;