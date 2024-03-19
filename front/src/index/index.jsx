import React, { useEffect, useState } from 'react';
 
function SuiteStore() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState('');
    const [tax, setTax] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [totalTax, setTotalTax] = useState('');

 
    useEffect(() => {
        fetchProducts();
        loadCart();
        getTotalTax()
        calculateTotal()
    }, []);
 
    const fetchProducts = () => {
fetch('http://localhost/routes/product.php')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    };
 
    const loadCart = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        calculateTotal();
    };
 
    const addToCart = () => {
        const selectedProduct = JSON.parse(document.getElementById("select-p").value);
        const existingProductIndex = cart.findIndex(item => item.Nproduct.product === selectedProduct.product);
 
        if (existingProductIndex !== -1) {
            alert("This product is already in the cart.");
            return;
        }
 
        if (parseInt(amount) > selectedProduct.amount) {
            alert("Selected quantity exceeds available quantity of the product.");
            return;
        }
 
        const total = (parseFloat(price) * parseInt(amount)) * (1 + (parseFloat(tax) / 100));
 
        const cartItem = { amount: parseInt(amount), price: parseFloat(price), tax: parseFloat(tax), total, Nproduct: selectedProduct };
        const updatedCart = [...cart, cartItem];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal();
        getTotalTax();
    };
 
    function calculateTotal() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let total = 0;
      let totalTax = 0;

      cart.forEach(item => {
          total += item.total;
          totalTax += (item.price * item.amount * item.tax) / 100;
      });
      document.getElementById('totalInput').value = total.toFixed(2);
      document.getElementById('totalTax').value = totalTax.toFixed(2);
  }
 
    const getTotalTax = () => {
        let totalTax = 0;
        cart.forEach(item => {
let itemTax = (parseFloat(item.price) * parseInt(item.amount) * parseFloat(item.tax)) / 100;
            totalTax += itemTax;
        });
        setTotalTax(totalTax.toFixed(2));
    };
 
    const finishOrder = () => {
        orderItem();
        setTimeout(() => {
            localStorage.removeItem('cart');
            ;
        }, 300);
    };
 
    const orderItem = async () => {
        const code = await order();
        cart.forEach(async (product) => {
            const data = new FormData();
            data.append("order_code", code.code);
            data.append("product_code", product.Nproduct[0]);
            data.append("amount", product.amount);
            data.append("price", product.price);
data.append("tax", product.tax);
await fetch(`http://localhost/routes/order_item.php`, {
                method: 'POST',
                body: data,
            });
        });
    };
 
    const order = async () => {
      const getTotal = parseFloat(document.getElementById("totalInput").value);
      const getTax = parseFloat(document.getElementById("totalTax").value);
      const data = new FormData();
      data.append("code", Math.floor(Math.random() * 10000));
      data.append("total", getTotal);
      data.append("tax", getTax);
  const response = await fetch(`http://localhost/routes/order.php`, {
          method: 'POST',
          body: data,
      });
      return await response.json();
  };
 
    const handleProductChange = (e) => {
        const selectedProduct = JSON.parse(e.target.value);
        setPrice(selectedProduct.price);
setTax(selectedProduct.tax);
    };
 
    const renderOptions = () => {
        return products.map((product, index) => (
            <option key={index} value={JSON.stringify(product)}>{product[1]}</option>
        ));
    };

    function cancelOrder() {
      localStorage.removeItem('cart');
      document.getElementById('productList').innerHTML = '';
      document.getElementById('total').innerText = '';
      document.getElementById('totalInput').value = '';
      document.getElementById('totalTax').value = '';
  }
 
    return (
        <div>
            <main>
                <div className="ProductAdd">
                    <div className="Product">
                        <div>
                            <select name="productHome" id="select-p" onChange={handleProductChange}>
                                <option disabled selected hidden>Product</option>
                                {renderOptions()}
                            </select>
                        </div>
                    </div>
                    <div className="SubIs">
                        <div><input type="number" id="amount" name="amountcart" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
                        <div><input type="number" id="tax" name="taxcart" placeholder="Tax" readOnly value={tax} onChange={(e) => setTax(e.target.value)} /></div>
                        <div><input type="text" id="price2" name="pricecart" placeholder="Price" readOnly value={price}  onChange={(e) => setPrice(e.target.value)}/></div>
                        <div hidden id="total" name="total">{total}</div>
                    </div>
                    <div className="Add">
                        <button type="submit" onClick={addToCart}>Add Cart</button>
                    </div>
                </div>
                <div className="tableP">
                    <table>
                        <thead>
                            <tr>
                                <th className="hometh" id="ccollun"><b>Product Code</b></th>
                                <th className="hometh" id="ccollun"><b>Product</b></th>
                                <th className="hometh" id="ccollun"><b>Amount</b></th>
                                <th className="hometh" id="ccollun"><b>Price</b></th>
                                <th className="hometh" id="ccollun"><b>Tax</b></th>
                                <th className="hometh" id="ccollun"><b>Total</b></th>
                                <th className="hometh" id="ccollun"><b>Action</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item}>
                                    <td className="hometd" id="ccollun" name="idproduct">{item.Nproduct[0]}</td>
                                    <td className="hometd" id="ccollun">{item.Nproduct[1]}</td>
                                    <td className="hometd" id="ccollun">{item.amount}</td>
                                    <td className="hometd" id="ccollun">{item.price}</td>
                                    <td className="hometd" id="ccollun">{item.tax}%</td>
                                    <td className="hometd" id="ccollun" name="total">{item.total.toFixed(2)}</td>
                                    <td className="hometd" id="ccollun"><button onClick={() => removeItem(item.code)} id='delete'>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                <label>Total: <input type="number" disabled id="totalInput"/></label>
            </div>
            <div>-
                <label>Tax: <input type="number" disabled id="totalTax"/></label>
            </div>
                    <div>
                        <button id="cancel" onClick={cancelOrder}>Cancel</button>
                    </div>
                    <div>
                        <button id="finish" onClick={finishOrder}>Finish</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
 
export default SuiteStore;