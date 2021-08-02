import React from 'react';
import "./Pagination.css";

function Pagination({total, count, paginate}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / count); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination">
            {pageNumbers.map(num => (
                <span key={num} onClick={() => paginate(num)} className="pagination_item">
                    <a>{num}</a>
                </span>
            ))}
        </div>
    )
}

export default Pagination;