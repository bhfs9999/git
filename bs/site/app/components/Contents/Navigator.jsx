var React = require('react');

var Navigator = React.createClass({
    render: function(){
        return (
            <ul className="list-group">
                <li className="list-group-item">
                    <strong>Main Categories</strong>
                </li>
                <li className="list-group-item">
                    <span className="badge">104</span>
                    Technology 
                </li>
                <li className="list-group-item">
                    <span className="badge">34</span>
                    Blogging 
                </li>
                <li className="list-group-item">
                    <span className="badge">10</span>
                    Information 
                </li>
                <li className="list-group-item">
                    <span className="badge">50</span>
                    Security 
                </li>
                <li className="list-group-item">
                    <strong>Other Categories</strong>
                </li>
                <li className="list-group-item">
                    <span className="badge">104</span>
                    Technology 
                </li>
                <li className="list-group-item">
                    <span className="badge">34</span>
                    Blogging 
                </li>
                <li className="list-group-item">
                    <span className="badge">10</span>
                    Information 
                </li>
                <li className="list-group-item">
                    <span className="badge">50</span>
                    Security 
                </li>
            </ul>
        );
    }
});

module.exports = Navigator;