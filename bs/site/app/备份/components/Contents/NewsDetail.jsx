import React from 'react'
import NewsHeading from './News/NewsHeading.jsx'
import NewsImg from './News/NewsImg.jsx'
import NewsInfo from './News/NewsInfo.jsx'

var NewsTxt = React.createClass({
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
            this.props.newsdata ?
            <div className="news-main">
                <NewsHeading heading={this.props.newsdata.heading} />
                <NewsInfo date={this.props.newsdata.date} cate={this.props.newsdata.cate} author={this.props.newsdata.author} />
                <NewsTxt txt={this.props.newsdata.detail} />
            </div>
            :
            null
        );
    }
});

module.exports = NewsDetail;