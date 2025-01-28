import React, { useState } from 'react';


const ProductCrudApp = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [newProduct, setNewProduct] = useState({ ProductName: "", Description: "", Price: "" });

    const handleAddProduct = () => {
        if (newProduct.ProductName && newProduct.Description && newProduct.Price) {
            setProducts([...products, { ...newProduct, id: Date.now() }]);
            setNewProduct({ ProductName: "", Description: "", Price: "" });
        }
    };

    const handleEditProduct = (id) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, ...newProduct } : product
        );
        setProducts(updatedProducts);
        setNewProduct({ ProductName: "", Description: "", Price: "" });
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const filteredProducts = products.filter((product) =>
        product.ProductName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Product CRUD</h1>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={newProduct.ProductName}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={newProduct.Description}
                        onChange={(e) => setNewProduct({ ...newProduct, Description: e.target.value })}
                    />
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={newProduct.Price}
                        onChange={(e) => setNewProduct({ ...newProduct, Price: e.target.value })}
                    />
                    <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.ProductName}</td>
                                <td>{product.Description}</td>
                                <td>{product.Price} Rs</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProduct(product.id)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductCrudApp;