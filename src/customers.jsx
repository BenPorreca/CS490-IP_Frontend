import { useState, useEffect } from "react";
import './pagination.css';

function Customers () {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    useEffect(() => {
        const fetchCustomers = async() => {
            try {
                const response = await fetch("/api/customers");
                if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
                setCustomers(result);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchCustomers();
    }, []);

    const pageCustomers = customers.slice(firstIndex, lastIndex);
    const npage = Math.ceil(customers.length / itemsPerPage);

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
            <h1>Customers:</h1>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {pageCustomers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.customer_id}</td>
                            <td>{customer.first_name} {customer.last_name}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className="pageItem">
                        <a href="#" className="pageLink" onClick={prevPage}>Prev</a>
                    </li>
                    
                    
                    {page > 2 && (
                        <li><a href="#" className="pageItem" onClick={() => changeCurrPage(1)}>{1}</a></li>
                    )}
                    {page > 3 && (
                        <li>...</li>
                    )}
                    {page > 1 && (
                        <li><a href="#" className="pageItem" onClick={() => changeCurrPage(page-1)}>{page-1}</a></li>
                    )}
                    <li>{page}</li>
                    {page < npage && (
                        <li><a href="#" className="pageItem" onClick={() => changeCurrPage(page+1)}>{page+1}</a></li>
                    )}
                    {page < npage-2 && (
                        <li>...</li>
                    )}
                    {page < npage-1 && (
                        <li><a href="#" className="pageItem" onClick={() => changeCurrPage(npage)}>{npage}</a></li>
                    )}

                    <li className="pageItem">
                        <a href="#" className="pageLink" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Customers;