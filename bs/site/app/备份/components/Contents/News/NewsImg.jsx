var React = require('react');

var NewsImg = React.createClass({
    getDefaultProps: function() {
        return {
            img: "assets/img/1.jpg"
        };
    },
    render: function(){
        return (
            <a href="singlepost.html">
                <img src={this.props.img} className="img-responsive img-rounded" />
            </a>
        );
    }
});

module.exports = NewsImg;