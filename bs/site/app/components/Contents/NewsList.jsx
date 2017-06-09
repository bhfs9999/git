import React from 'react'
import NewsHeading from './News/NewsHeading.jsx'
import NewsImg from './News/NewsImg.jsx'
import NewsInfo from './News/NewsInfo.jsx'

var NewsTxt = React.createClass({
    getDefaultProps: function() {
        return {
            txt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus, tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
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

var News = React.createClass({
    render: function(){
        return (
            <div className="news-main">
                <NewsHeading heading={this.props.heading} newsid={this.props.newsid} cate={this.props.cate}/>
                {/*<NewsImg img={this.props.img} />*/}
                <NewsInfo date={this.props.date} cate={this.props.cate} author={this.props.author} />
                <NewsTxt txt={this.props.txt} />
            </div>
        );
    }
});

var NewsList = React.createClass({
    render: function(){
        return (
            <div>
            {
                this.props.newsdata.news.map(function (anews, index) {
                    return <News 
                            heading={anews.heading}
                            img={anews.img}
                            date={anews.date}
                            cate={anews.cate}
                            author={anews.author}
                            txt={anews.txt}
                            newsid={anews.newsid}
                            />
                }, this)
            }
            </div>
        );
    }
});

module.exports = NewsList;