var React = require('react');
import {Link} from 'react-router'

var Navigator = React.createClass({
    getDefaultProps: function() {
        return {
            cates: [["inland", "国内"], 
                    ["global", "国际"], 
                    ["sport", "体育"], 
                    ["finance", "经济"],
                    ["game", "游戏"]]
        }
    },
    getInitialState: function() {
        return {
            count: {"国内": "Loading", "国际": "Loading", "体育": "Loading", "经济": "Loading", "游戏": "Loading"}
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
                        return <Link to={cate[0]}>
                                   <li className="list-group-item">
                                        <span className="badge">{this.state.count[cate[1]]}</span>
                                        {cate[1]}                                     
                                   </li>
                               </Link>
                    }, this)
                }
            </ul>
        );
    }
});

module.exports = Navigator;