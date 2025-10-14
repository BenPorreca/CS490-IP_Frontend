import { useState, useEffect } from "react";
import Pagination from "./pagination.jsx";
import { ModalCustomer } from "./modal.jsx";
import "./customers.css";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ first_name: "", last_name: "", email: "" });
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("id");
    const [filtered, setFiltered] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [rentals, setRentals] = useState([]);

    const [newAddress, setNewAddress] = useState({
        address: "",
        district: "",
        city: "",
        country: "",
        postal_code: "",
        phone: "",
    });

    const [newCustomer, setNewCustomer] = useState({
        store_id: "",
        first_name: "",
        last_name: "",
        email: "",
        active: true,
    });

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("/api/customers");
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                const result = await response.json();
                setCustomers(result);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchCustomers();
    }, []);

    const fetchCustomerRentals = async (customerId) => {
        try {
            const res = await fetch(`/api/customerRentals?customerId=${customerId}`);
            const data = await res.json();
            setRentals(data);
        } catch (err) {
            console.error("Error fetching rentals:", err);
            setRentals([]);
        }
    };

    const handleCustomerClick = async (customer) => {
        setSelectedCustomer(customer);
        await fetchCustomerRentals(customer.customer_id);
        setModalOpen(true);
    };

    const handleEdit = (customer) => {
        setEditingId(customer.customer_id);
        setEditForm({
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({ first_name: "", last_name: "", email: "" });
    };

    const handleSave = async (id) => {
        const fullName = `${editForm.first_name} ${editForm.last_name}`.trim();
        const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
        if (!nameRegex.test(fullName)) {
            alert("Name must be two words (letters only)");
            return;
        }
        
        try {
            const res = await fetch(`/api/customers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: editForm.first_name,
                last_name: editForm.last_name,
                email: editForm.email,
            }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const result = await res.json();
            console.log(result);

            setCustomers((prev) =>
            prev.map((c) =>
                c.customer_id === id ? { ...c, ...editForm } : c
            )
            );
            setEditingId(null);
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("Failed to update customer.");
        }
    };

    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure u want to delete this customer?")) return;

    try {
        const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        console.log(result);

        setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
    } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer.");
    }
    };

    const handleAddCustomer = async (e) => {
    e.preventDefault();

        try {
            const payload = {
                store_id: newCustomer.store_id,
                first_name: newCustomer.first_name,
                last_name: newCustomer.last_name,
                email: newCustomer.email,
                address: newAddress.address,
                district: newAddress.district,
                postal_code: newAddress.postal_code,
                phone: newAddress.phone,
                city: newAddress.city,
                country: newAddress.country,
            };

            const res = await fetch("/api/customerAdd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Error adding customer:", data);
                alert(data.error || "Failed to add customer.");
                return;
            }

            alert("Customer added successfully!");

            if (data.customer) {
                setCustomers((prev) => [...prev, data.customer]);
            } else {
                const refreshed = await fetch("/api/customers").then((r) => r.json());
                setCustomers(refreshed);
            }

            setNewAddress({
                address: "",
                district: "",
                city: "",
                country: "",
                postal_code: "",
                phone: "",
            });

            setNewCustomer({
                store_id: "",
                first_name: "",
                last_name: "",
                email: "",
                active: true,
            });
        } catch (err) {
            console.error("Error adding customer:", err);
            alert("Error while adding customer.");
    }
};

    return (
        <div className="page">
            <form className="add-customer-form" onSubmit={handleAddCustomer}>
                <h2>Add New Customer</h2>
                <div className="form-section">
                    <h3>Customer Info</h3>
                    <input
                        type="number"
                        placeholder="Store ID"
                        value={newCustomer.store_id}
                        onChange={(e) =>
                            setNewCustomer((prev) => ({ ...prev, store_id: e.target.value }))
                        }
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newCustomer.first_name}
                        onChange={(e) =>
                            setNewCustomer((prev) => ({ ...prev, first_name: e.target.value }))
                        }
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newCustomer.last_name}
                        onChange={(e) =>
                            setNewCustomer((prev) => ({ ...prev, last_name: e.target.value }))
                        }
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newCustomer.email}
                        onChange={(e) =>
                            setNewCustomer((prev) => ({ ...prev, email: e.target.value }))
                        }
                    />
                </div>

                <div className="form-section">
                    <h3>Address Info</h3>
                    <input
                    type="text"
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) =>
                        setNewAddress((prev) => ({ ...prev, address: e.target.value }))
                    }
                    />

                    <input
                    type="text"
                    placeholder="District"
                    value={newAddress.district}
                    onChange={(e) =>
                        setNewAddress((prev) => ({ ...prev, district: e.target.value }))
                    }
                    />

                    <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                        setNewAddress((prev) => ({ ...prev, city: e.target.value }))
                    }
                    />

                    <input
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) =>
                        setNewAddress((prev) => ({ ...prev, country: e.target.value }))
                    }
                    />

                    <input
                    type="text"
                    placeholder="Postal Code"
                    value={newAddress.postal_code}
                    onChange={(e) =>
                        setNewAddress((prev) => ({ ...prev, postal_code: e.target.value }))
                    }
                    />

                    <input
                    type="text"
                    placeholder="Phone"
                    value={newAddress.phone}
                    onChange={(e) =>
                        setNewAddress((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    />
                </div>

                <input
                    type="hidden"
                    value={newCustomer.active ?? true}
                    onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, active: e.target.value === "true" }))
                    }
                />
                <input
                    type="hidden"
                    value={newCustomer.create_date ?? new Date().toISOString()}
                    onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, create_date: e.target.value }))
                    }
                />
                <input
                    type="hidden"
                    value={newCustomer.last_update ?? new Date().toISOString()}
                    onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, last_update: e.target.value }))
                    }
                />

                <button type="submit">Add Customer</button>
            </form>

            <form className="customer-search-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    const q = query.trim().toLowerCase();
                    if (!q) {
                        setFiltered(customers);
                        return;
                    }

                    if (searchType === "id") {
                        setFiltered(customers.filter(c => String(c.customer_id) === q));
                    } else if (searchType === "first_name") {
                        setFiltered(customers.filter(c => c.first_name.toLowerCase().includes(q)));
                    } else if (searchType === "last_name") {
                        setFiltered(customers.filter(c => c.last_name.toLowerCase().includes(q)));
                    }
                }}>
                <h2>Search Customers</h2>
                <input
                    type="text"
                    placeholder="Enter your search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="id">Customer ID</option>
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                </select>
                <button type="submit">Search</button>
            </form>

            <Pagination
                data={filtered.length > 0 ? filtered : customers}
                name="Customers"
                headers={["ID", "Name", "Email", "Actions"]}
                renderRow={(customer) => (
                    <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>

                        {editingId === customer.customer_id ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        value={`${editForm.first_name} ${editForm.last_name}`}
                                        onChange={(e) => {
                                            const [first, ...last] = e.target.value.split(" ");
                                            setEditForm((f) => ({
                                                ...f,
                                                first_name: first,
                                                last_name: last.join(" "),
                                            }));
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) =>
                                            setEditForm((f) => ({ ...f, email: e.target.value }))
                                        }
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleSave(customer.customer_id)}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>
                                    <button className="link-button" onClick={() => handleCustomerClick(customer)}>
                                        {customer.first_name} {customer.last_name}
                                    </button>
                                </td>
                                <td>{customer.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(customer)}>Edit</button>
                                    <button onClick={() => handleDelete(customer.customer_id)}>Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                )}
            />
            {modalOpen && selectedCustomer && (
                <ModalCustomer
                    setModalOpen={setModalOpen}
                    customer={selectedCustomer}
                    rentals={rentals}
                />
            )}
        </div>
    );
}

export default Customers;
