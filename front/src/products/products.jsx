import React, { useEffect, useState } from 'react';
 import './products.css'
function ProductsManagement() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
 
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('price', price);
    formData.append('category', category);
 
    try {
const response = await fetch("http://localhost/routes/product.php", {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert("Produto adicionado com sucesso!");
        loadProducts();
      } else {
        const errorText = await response.text();
        alert("Erro ao adicionar produto: " + errorText);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error.message);
    }
  }
 
  async function loadCategories() {
    try {
const response = await fetch('http://localhost/routes/categories.php',{method:'get'});
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Erro ao buscar categorias:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
 
  async function loadProducts() {
    try {
const response = await fetch('http://localhost/routes/product.php', {method:'get'});
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Erro ao buscar produtos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }
 
  async function handleDelete(code) {
    try {
const response = await fetch(`http://localhost/routes/product.php?code=${code}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Produto excluído com sucesso');
        loadProducts();
      } else {
        console.error('Erro ao excluir produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  }
 
  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);
 
  return (
    <main>
    <div>
      <h1>Adicionar Produto</h1>
      <div>
      <form id="prodForm" onSubmit={handleSubmit}>
      <div className="Product">
                <input type="text" value={name} onChange={(e) => setName()} placeholder="Nome do Produto" />
                </div>
                <div className="SubIs2">
                <input type="number"  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Quantidade" />
                </div>
                <div>
                <input type="number"  value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" />
                </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">Selecione uma categoria</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>{cat.name}</option>
  ))}
</select>
        <button type="submit">Adicionar Produto</button>
      </form>
       
   


      
 
      <h1>Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.amount}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleDelete(product.code)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </main>
  );
}
 
export default ProductsManagement;
