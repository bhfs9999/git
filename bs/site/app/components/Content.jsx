var React = require('react');
var News = require('./Contents/News.jsx');
var Paging = require('./Contents/Paging.jsx');
var Navigator = require('./Contents/Navigator.jsx');
var Search = require('./Contents/Search.jsx');
let newsData = require('./news.json');

var Content = React.createClass({
    getInitialState: function() {
        return {showDetail: false,
                detailIndex: -1,
                txt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus, tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum."]
               };
    },
    handleClick: function(event) {
        // newsData.news.map(function (anews) {
        //     this.changetxt()
        // }, this)
        var newsId=event.target.id.substr(5)
        this.setState({showDetail: true,
                       detailIndex: newsId,
                       txt: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, <i> tincidunt eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i>quis tristique odio imperdiet. Nullam elit lacus, tincidunt<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong> eget faucibus eget, vestibulum venenatis metus. Praesent efficitur quam aliquam mauris sagittis, vel lacinia risus luctus. Ut vitae bibendum ipsum.",
                             "Lorem ipsum<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong>  feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus,<i> tincidunt eget faucibus eget, vestibulum venenatis metus.Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i> risus luctus. Ut vitae bibendum ipsum.",
                             "Lorem ipsum<strong>dolor sit amet, consectetur adipiscing elit. Fusce nec tellus non diam</strong>  feugiat commodo. Sed auctor mauris a tristique imperdiet. Nullam egestas sapien non lectus suscipit, quis tristique odio imperdiet. Nullam elit lacus,<i> tincidunt eget faucibus eget, vestibulum venenatis metus.Praesent efficitur quam aliquam mauris sagittis, vel lacinia</i> risus luctus. Ut vitae bibendum ipsum."]});
    },
    changetxt: function() {
        // alert('123')
    },
    render: function(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                {
                    newsData.news.map(function (anews, index) {
                        var listedNews;
                        if(!this.state.showDetail || this.state.showDetail&&index==this.state.detailIndex) {
                            listedNews = (
                                <News 
                                heading={anews.heading}
                                updateProp={this.handleClick}
                                img={anews.img}
                                date={anews.date}
                                cate={anews.cate}
                                author={anews.author}
                                txt={anews.txt}
                                id={"news " + index}
                                />
                            )
                        }
                        else {
                            listedNews=null
                        }
                        return listedNews
                    }, this)
                }
                    {/*<News 
                    heading="The security is main concern while developing applications"
                    updateProp={this.handleClick}
                    img="assets/img/1.jpg"
                    date="Posted on 26th November 2014"
                    cate="In Technology"
                    author="By Jhon"
                    txt= {this.state.txt}
                    />*/}
                    {/*<News />
                    <News />*/}
                {this.state.showDetail ? null  : <Paging />}
                
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