import React, { useState, useEffect } from 'react';

export default function tableProducts(){
    const [products, setProducts] = useState([]);
useEffect(() =>  { try {
const response = fetch('http://localhost/routes/product.php',{method:'GET'})
.then(response => response.json())
.then(data =>{
    setProducts(data);
})
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  })

  async function handleDelete(code) {
    try {
const response = await fetch(`http://localhost/routes/product.php?code=${code}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Categoria excluída com sucesso');
        setProducts(products.filter(product => product.code !== code));
      } else {
        console.error('Erro ao excluir categoria:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  }
 
  useEffect(() => {
  }, []);
    return(
        <>
        {products.map(product => (
                                <tr key={product.code}>
                                    <td className="hometd">{product[0]}</td>
                                    <td className="hometd">{product[1]}</td>
                                    <td className="hometd">{product.amount}</td>
                                    <td className="hometd">{product.price}</td>
                                    <td className="hometd">{product.name}</td>
                                    <td className="hometd">
                                        <button className="delete" onClick={() => handleDelete(product[0])}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </>
    )
}