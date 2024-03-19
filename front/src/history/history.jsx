import React, { useEffect, useState } from 'react';
 
function App() {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [saleItems, setSaleItems] = useState([]);
 
  useEffect(() => {
    fetchSales();
  }, []);
 
  const fetchSales = () => {
fetch('http://localhost/routes/order.php')
      .then(response => response.json())
      .then(data => setSales(data))
      .catch(error => console.error('Error fetching sales:', error));
  };
 
  const fetchSaleItems = (code) => {
fetch(`http://localhost/routes/order_item.php?order_code=${code}`)
      .then(response => response.json())
      .then(data => {
        setSaleItems(data.filter(item => item.code === code));
      })
      .catch(error => console.error('Error fetching sale items:', error));
  };
 
  const showSaleDetails = (code) => {
    setSelectedSale(code);
    fetchSaleItems(code);
  };
 
  return (
    <div>

      <main>
        <div className="gridArea1">
            <h1>Historico</h1>
          <table>
            <thead>
              <tr>
                <td className="ccollun">Code</td>
                <td className="ccollun">Tax</td>
                <td className="ccollun">Total</td>
                <td className="ccollun">Action</td>
              </tr>
            </thead>
            <tbody>
              {sales.map(order => (
                <tr key={order.code}>
                  <td className="ccollun">{order.code}</td>
                  <td className="ccollun">R${order.tax}</td>
                  <td className="ccollun">R${order.total}</td>
                  <td className="ccollun">
                    <button onClick={() => showSaleDetails(order.code)}>VIEW</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tableP">
            <h1>Detalhes</h1>
          <table>
            <thead>
              <tr>
                <td className="ccollun">Product</td>
                <td className="ccollun">Unit price</td>
                <td className="ccollun">Product Tax</td>
                <td className="ccollun">Amount</td>
              </tr>
            </thead>
            <tbody>
              {saleItems.map(item => (
                <tr key={item.code}>
                  <td className="ccollun">{item.code}</td>
                  <td className="ccollun">R${item.price}</td>
                  <td className="ccollun">{item[5]}%</td>
                  <td className="ccollun">{item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div id="sale-details" className="prices"></div>
        </div>
      </main>
    </div>
  );
}
 
export default App;