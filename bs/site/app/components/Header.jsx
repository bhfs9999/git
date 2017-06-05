var React = require('react');

var Header = React.createClass({
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <img src="assets/img/person.jpg" className="img-circle img-responsive" />
                </div>
                <div className="col-md-5 text-center">
                    <h1><strong>Jhon Alexan </strong></h1>
                    <h4>Blogger & Designer</h4>
                </div>
                <div className="col-md-5">
                    <h3>WHO M I :</h3>

                    I am a 26 years old guy who loves bloggging and designing .
                    I will provide all my works for free here with some good piece of information.
                    You can reach me at <i><strong>info@mydomain.com</strong></i>
                </div>
            </div>
        </div>
        );
    }
});

module.exports = Header;