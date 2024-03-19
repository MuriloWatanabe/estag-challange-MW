import { useEffect, useState } from "react";

export default function tableCategories(){
const [categories, setCategories] = useState([]);
useEffect(() =>  { try {
const response = fetch('http://localhost/routes/categories.php',{method:'GET'})
.then(response => response.json())
.then(data =>{
    setCategories(data);
})
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  })

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
  }, []);
 
return(
<>
        {categories.map(category => (
            <tr key={category.code}>
              <td>{category.code}</td>
              <td>{category.name}</td>
              <td>{category.tax}%</td>
              <td>
                <button  id='delete' onClick={() => handleDelete(category.code)}>Excluir</button>
              </td>
            </tr>
          ))}
    
          </>
          )
}