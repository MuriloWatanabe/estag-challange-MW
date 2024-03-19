import React, { useEffect, useState } from 'react';

function SuiteStore() {
    const [orders, setOrders] = useState([]);
   
    useEffect(() =>  {
        fetch('http://localhost/routes/order.php', {
        })
        .then(response => response.json())
        .then(data => {
            setOrders(data);
        })
        .catch(error => console.log(error));
    }, []);
 
    const [order_item, setOrder_item] = useState([]);
   
    useEffect(() =>  {
        fetch('http://localhost/routes/order_item.php', {
        })
        .then(response => response.json())
        .then(data => {
            setOrder_item(data);
        })
        .catch(error => console.log(error));
    }, []);
 
  return (
<>
<main>
        <div class="gridArea1">
            <table>
                <thead>
                    <td id="ccollun">Code</td>
                    <td id="ccollun">Tax</td>
                    <td id="ccollun">Total</td>
                    <td id="ccollun">Action</td>
                </thead>
                <tbody>
          {orders.map(order => (
            <tr key={order.code}>
              <td>{order.code}</td>
              <td>{order.name}</td>
              <td>{order.tax}%</td>
              <td id="ccollun"><button onclick="showSaleDetails(${order.code})">VIEW</button></td>
            </tr>
          ))}
        </tbody>
            </table>
        </div>
        <div class="tableP">
            <table>
                <tr>
                    <td id="ccollun">Product</td>
                    <td id="ccollun">Unit price</td>
                    <td id="ccollun">Product Tax</td>
                    <td id="ccollun">Amount</td>
                </tr>
                <tbody>
          {order_item.map(orderI => (
            <tr key={orderI.code}>
              <td>{orderI.name}</td>
              <td>{orderI.price}</td>
              <td>{orderI.tax}%</td> 
              <td>{orderI[3]}</td>
            </tr>
          ))}
        </tbody>
            </table>
            <div id="sale-details" class="prices">

            </div>
        </div>
        </main>
    </>
  );
}
 
export default SuiteStore;