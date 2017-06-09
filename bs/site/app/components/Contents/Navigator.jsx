var React = require('react');

var Navigator = React.createClass({
    getDefaultProps: function() {
        return {
            cates: ["国内", "国际", "体育", "经济", "游戏"]
        }
    },
    getInitialState: function() {
        return {
            count: {"国内":0, "国际":0, "体育":0, "经济":0, "游戏":0}
        };
    },
    componentDidMount() {
        var url = '/api/getcount?' + new Date()
        fetch(url,{
                method: 'GET', 
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'text/plain'
                })
            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(JSON.parse(data));
                this.setState({
                    count: JSON.parse(data)
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    render: function(){
        return (
            <ul className="list-group">
                <li className="list-group-item">
                    <strong>Categories</strong>
                </li>
                {
                    this.props.cates.map(function(cate) {
                        return <li className="list-group-item">
                                   <span className="badge">{this.state.count[cate]}</span>
                                   {cate} 
                               </li>
                    }, this)
                }
            </ul>
        );
    }
});

module.exports = Navigator;