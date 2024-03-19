import React, { useState, useEffect } from 'react';
import './products.css';
import TableProducts from '../components/Tables/tableproducts';

function SuiteStore() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState('');
   
    useEffect(() =>  {
        fetch('http://localhost/routes/categories.php', {
        })
        .then(response => response.json())
        .then(data => {
            setCategories(data);
        })
        .catch(error => console.log(error));
    }, []);
 
    useEffect(() =>  {
        fetch('http://localhost/routes/product.php', {
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
        .catch(error => console.log(error));
    }, [])


    return (
        <div>
            <main>
                <form action='http://localhost/routes/product.php' method='POST'>
                <h1> Adicionar Produtos</h1>
                    <div className="ProductAdd">
                        <div className="Product">
                            <input type="text" maxLength="30" name='productN' placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className="SubIs2">
                            <div><input type="number" id="amount2" name='amountP' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" min="1" /></div>
                            <div><input type="number" name='priceP'id='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Unit Price" step="0.1" /></div>
                            <div>
                               <select className="sub-input" id="select-c" name="label" required>
                                <option value="" disabled selected hidden>Categories</option>
                                {categories.map((category)=>(
                                    <option value={category.code}>{category.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="Add">
                            <button type="submit">Add Product</button>
                        </div>
                    </div>
                </form>
                
                <div className="tableP">
                <h1>Produtos</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="hometh"><b>Code</b></th>
                                <th className="hometh"><b>Product</b></th>
                                <th className="hometh"><b>Amount</b></th>
                                <th className="hometh"><b>Unit price</b></th>
                                <th className="hometh"><b>Category</b></th>
                                <th className="hometh"><b>Options</b></th>
                            </tr>
                        </thead>
                        <tbody>
                <TableProducts/>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default SuiteStore;