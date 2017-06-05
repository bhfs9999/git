var React = require('react');

var Footer = React.createClass({
    render: function(){
        return (
        <div className="row">
            <div className="col-md-12 text-center set-foot">
                © copy 2017 Xuechen Liu |  News From <a href="http://www.people.com.cn/" target="_blank" title="人民网">人民网</a>  <a href="http://www.xinhuanet.com/" title="新华网" target="_blank">新华网</a>
            </div>
        </div>
        );
    }
});

module.exports = Footer;