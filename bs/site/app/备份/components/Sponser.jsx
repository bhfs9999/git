var React = require('react');

var Sponser = React.createClass({
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-2 spon-txt">
                    <span>My Sponsers: </span>
                </div>
                <div className="col-md-10">
                    <img src="assets/img/clients.png" alt="" className="img-rounded img-responsive" />
                </div>
                
            </div>
        </div>
        );
    }
});

module.exports = Sponser;