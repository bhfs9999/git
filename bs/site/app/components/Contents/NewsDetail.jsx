import React from 'react'
import NewsHeading from './News/NewsHeading.jsx'
import NewsImg from './News/NewsImg.jsx'
import NewsInfo from './News/NewsInfo.jsx'

var NewsTxt = React.createClass({
    getDefaultProps: function() {
        return {
            txt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus, tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum."]
        };
    },
    render: function(){
        return (
            <div>
            {
                this.props.txt.map(function (text) {
                    return <div className="news-txt" dangerouslySetInnerHTML={{__html: text}}></div>
                })
            }
            </div>
        );
    }
});

var NewsDetail = React.createClass({
    render: function(){
        return (
            <div className="news-main">
                <NewsHeading heading={this.props.newsdata.heading} />
                <NewsInfo date={this.props.newsdata.date} cate={this.props.newsdata.cate} author={this.props.newsdata.author} />
                <NewsTxt txt={this.props.newsdata.detail} />
            </div>
        );
    }
});

module.exports = NewsDetail;