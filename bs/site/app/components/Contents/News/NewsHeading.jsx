var React = require('react');
import {Link} from 'react-router'

var NewsHeading = React.createClass({
    getDefaultProps: function() {
        return {
            heading: "The security is main concern while developing applications"
        };
    },
    render: function(){
        var heading;
        if (this.props.newsid) {
            heading = (
                <div className="heading-news">
                    <a id={this.props.newsid} className="news-heading">
                        <Link to={"/detail"+this.props.newsid}>
                            {this.props.heading}
                        </Link>
                    </a>
                </div>
            )
        }
        else {
            heading = (
                <div className="heading-news">
                    <a className="news-heading">
                        {this.props.heading}
                    </a>
                </div>
            )
        }
        return (
            heading
        );  
    }
});

module.exports = NewsHeading;