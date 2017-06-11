var React = require('react');
import {Link} from 'react-router'

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
                        <li><Link to="/"><span aria-hidden="true" style={myStyle}>&lt;&lt;</span></Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
});

module.exports = Goback;