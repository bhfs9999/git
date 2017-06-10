var React = require('react');
import {Link} from 'react-router'

var NewsHeading = React.createClass({
    getDefaultProps: function() {
        return {
            heading: "The security is main concern while developing applications",
            catemap: {"国内": "inland", "国际": "global", "体育": "sport", "经济": "finance", "游戏": "game"}
        };
    },
    render: function(){
        var heading;
        if (this.props.newsid) {
            heading = (
                <div className="heading-news">
                    <a id={location.pathname} className="news-heading">
                        <Link to={this.props.catemap[this.props.cate] + "/" + this.props.newsid}>
                            {this.props.heading}
                        </Link>
                    </a>
                </div>
            )
        }
        else {
            heading = (
                <div className="heading-news">
                    <a className="news-heading" >
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