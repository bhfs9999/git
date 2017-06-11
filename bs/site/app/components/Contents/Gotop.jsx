var React = require('react');

var Gotop = React.createClass({
    handleclick: function() {
        $('html,body').animate({scrollTop: '0px'}, 500);
    },
    render: function(){
        var myStyle = {
            fontSize: 30,
            cursor: "pointer"
        };
        return (
            <div className="go-top">
            <br />
                <nav>
                    <ul className="pagination">
                        <li onClick={this.handleclick}>
                            <span className="glyphicon glyphicon-eject" aria-hidden="true" style={myStyle}></span>
                        </li>
                    </ul>
                </nav>
            </div>
        ); 
    }
});

module.exports = Gotop;