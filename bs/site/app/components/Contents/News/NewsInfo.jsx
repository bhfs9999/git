var React = require('react');
import {Link} from 'react-router'

var NewsInfo = React.createClass({
    render: function(){
        return (
            <div className="news-info">
                <span className="label label-primary">{this.props.date}</span>
                <span className="label label-success">{this.props.cate}</span>
                <span className="label label-danger">{this.props.author}</span>
            </div>
        );
    }
});

module.exports = NewsInfo;