var React = require('react');

var Search = React.createClass({
    render: function(){
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Subscribe For Updates</h3>
                    </div>
                    <div className="panel-body">
                        <input type="text" className="form-control" placeholder="Your Email" />
                        <hr />
                        <a href="#" className="btn btn-info btn-sm btn-block">subscribe</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Search;