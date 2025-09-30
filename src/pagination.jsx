import { useState } from "react";
import './pagination.css';

function Pagination ({data, name, headers, renderRow}) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const pageData = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / itemsPerPage);
    function prevPage (){
        if (page > 1){
            setPage(page - 1);
        }
    };
    function changeCurrPage (id){
        setPage(id);
    };
    function nextPage (){
        if (page < npage){
            setPage(page + 1);
        }
    };
    return (
        <div>
            <h1>{name}:</h1>
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pageData.map((item) => renderRow(item))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className="pageItem">
                        <button className="pageLink" onClick={prevPage}>Prev</button>
                    </li>
                    {page > 2 && (
                        <li><button className="pageItem" onClick={() => changeCurrPage(1)}>{1}</button></li>
                    )}
                    {page > 3 && (
                        <li>...</li>
                    )}
                    {page > 1 && (
                        <li><button className="pageItem" onClick={() => changeCurrPage(page-1)}>{page-1}</button></li>
                    )}
                    <li>{page}</li>
                    {page < npage && (
                        <li><button className="pageItem" onClick={() => changeCurrPage(page+1)}>{page+1}</button></li>
                    )}
                    {page < npage-2 && (
                        <li>...</li>
                    )}
                    {page < npage-1 && (
                        <li><button className="pageItem" onClick={() => changeCurrPage(npage)}>{npage}</button></li>
                    )}

                    <li className="pageItem">
                        <button className="pageLink" onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;