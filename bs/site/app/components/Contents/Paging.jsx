var React = require('react');

var Paging = React.createClass({
    render: function(){
        return (
            <nav>
                <ul className="pagination">
                    <li className="disabled"><a href="#"><span aria-hidden="true">&laquo;</span><span className="sr-only">Previous</span></a></li>
                    <li className="active"><a href="#">1 <span className="sr-only">(current)</span></a></li>
                    <li><a href="#">2 <span className="sr-only"></span></a></li>
                    <li><a href="#">3 <span className="sr-only"></span></a></li>
                    <li><a href="#">4 <span className="sr-only"></span></a></li>
                    <li><a href="#">5 <span className="sr-only"></span></a></li>
                    <li><a href="#"><span aria-hidden="true">&raquo;</span><span className="sr-only">Next</span></a></li>
                </ul>
            </nav>
        );
    }
});

module.exports = Paging;