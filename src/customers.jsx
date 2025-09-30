import { useState, useEffect } from "react";
import Pagination from './pagination.jsx'
import './pagination.css';
import './customers.css';

function Customers () {
    const [customers, setCustomers] = useState([]);

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

    return (
        <div className="page">
            <Pagination 
                data={customers}
                name="Customers"
                headers={["ID", "Name", "Email"]}
                renderRow={(customer) => (
                    <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.first_name} {customer.last_name}</td>
                        <td>{customer.email}</td>
                    </tr>
                )}
                />
        </div>
    );
};

export default Customers;