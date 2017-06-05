var React = require('react');

var Goback = React.createClass({
    render: function(){
        var myStyle = {
            fontSize: 20,
        };
        return (
            <div>
            <br />
                <nav>
                    <ul className="pagination">
                        <li><a onClick={this.props.updateProp}><span aria-hidden="true" style={myStyle}>&lt;&lt;</span><span className="sr-only">Previous</span></a></li>
                    </ul>
                </nav>
            </div>
        );
    }
});

module.exports = Goback;