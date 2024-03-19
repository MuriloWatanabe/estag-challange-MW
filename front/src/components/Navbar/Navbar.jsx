import { useState } from 'react'
import './Navbar.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<div>
<nav>
        <ul>
    <h1>Suite Home</h1>
            <li><a href="index">Home</a></li>
            <li><a href="products">Products</a></li>
            <li><a href="categories">Categories</a></li>
            <li><a href="history">History</a></li>
        </ul>
    </nav>
</div>
    </>
  )
}

export default App
