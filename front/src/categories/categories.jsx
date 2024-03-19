import React, { useEffect, useState } from 'react';
import './categories.css'
import TableCategories from '../components/Tables/tablecategories';

function CategoriesManagement() {
  const [name, setName] = useState('');
  const [tax, setTax] = useState('');
  const [categories, setCategories] = useState([]);
 
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tax', tax);
 
    try {
const response = await fetch("http://localhost/routes/categories.php", {
        method: 'POST',
      });
      if (response.ok) {
        alert("Categoria adicionada com sucesso!");
        setName('');
        setTax('');
        loadCategories();
      } else {
        const errorText = await response.text();
        alert("Erro ao adicionar categoria: " + errorText);
      }
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error.message);
    }
  }
 
  async function loadCategories() {
    try {
const response = await fetch('http://localhost/routes/categories.php');
      if (response.ok) {
        const data = await response.json();
setCategories(data.filter(category => !/[!@#$%^&*()_{}\[\]:;<>,.?~]/.test(category.name)));
      } else {
        console.error('Erro ao buscar categorias:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
 
  async function handleDelete(code) {
    try {
const response = await fetch(`http://localhost/routes/categories.php?code=${code}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Categoria excluída com sucesso');
        setCategories(categories.filter(category => category.code !== code));
      } else {
        console.error('Erro ao excluir categoria:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  }
 
  useEffect(() => {
    loadCategories();
  }, []);
 
  return (
<>
    <main>
    <div className="CNAdd">   
      <h1>Adicionar Categoria</h1>
      <form onSubmit={handleSubmit}>
      <div className="CategoryName">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da Categoria" />
        </div>
        <div className="SubIs">
                    <div><input type="number" value={tax} onChange={(e) => setTax(e.target.value)} placeholder="Taxa (%)" /></div>
                </div>
                <div className="Add">
                <button type="submit">Adicionar Categoria</button>
                </div>
        </form>
     </div>
      <div className="tableP">
      <h1>Categorias</h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Taxa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
            <TableCategories/>
        </tbody>
      </table>
    </div>
    </main>
    </>
  );
}
 
export default CategoriesManagement;