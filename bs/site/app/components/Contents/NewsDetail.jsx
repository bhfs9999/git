var React = require('react');

var NewsHeading = React.createClass({
    getDefaultProps: function() {
        return {
            heading: "The security is main concern while developing applications"
        };
    },
    render: function(){
        return (
            <div className="heading-news">
                {/*<a href="singlepost.html">*/}
                <a id={this.props.id} onClick={this.props.updateProp} className="news-heading">
                    {this.props.heading}
                </a>
            </div>
        );  
    }
});

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

var NewsInfo = React.createClass({
    getDefaultProps: function() {
        return {
            date: "Posted on 26th November 2014",
            cate: "In Technology",
            author: "By Jhon"
        };
    },
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
                <NewsHeading heading={this.props.heading} updateProp={this.props.updateProp} id={this.props.id}/>
                {/*<NewsImg img={this.props.img} />*/}
                <NewsInfo date={this.props.date} cate={this.props.cate} author={this.props.author} />
                <NewsTxt txt={this.props.txt} />
            </div>
        );
    }
});

module.exports = NewsDetail;