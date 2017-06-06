import {Router, Route, Link} from 'react-router'
var React = require('react');
var News = require('./Contents/News.jsx');
var NewsDetail = require('./Contents/NewsDetail.jsx');
var Paging = require('./Contents/Paging.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');
var Goback = require('./Contents/Goback.jsx');
let newsData = require('./news.json');

var Content = React.createClass({
    getInitialState: function() {
        return {showDetail: false,
                detailIndex: -1,
                txt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus, tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum."]
               };
    },
    handleHeadingClick: function(event) {
        // newsData.news.map(function (anews) {
        //     this.changetxt()
        // }, this)
        var newsId=event.target.id.substr(5)
        this.setState({showDetail: true,
                       detailIndex: newsId,
                       txt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                             "Lorem ipsum<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong>  feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus,<i> tincidunt eget faucibus eget, vestibulum venenatis metus.Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i> risus luctus. Ut vitae bibendum ipsum.",
                             "Lorem ipsum<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong>  feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus,<i> tincidunt eget faucibus eget, vestibulum venenatis metus.Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i> risus luctus. Ut vitae bibendum ipsum."]
                     });
    },
    handleGobackClick: function(event) {
        this.setState({
            showDetail: false
        });
    },
    changetxt: function() {
        // alert('123')
    },
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-1">
                    <Goback updateProp={this.handleGobackClick} />
                </div>
                <div className="col-md-8">
                    {this.props.children}
                <Paging />
                
                </div>
                <div className="col-md-3">
                    <Navigator />
                    <br />
                    <br />
                    <Search />
                </div>
            </div>
        </div>
        );
    }
});

module.exports = Content;